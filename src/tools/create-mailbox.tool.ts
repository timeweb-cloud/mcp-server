import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createMailboxAction } from "../actions/create-mailbox.action";

const inputSchema = {
  domain: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailbox: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика (часть до @). Полный адрес будет mailbox@domain"
    ),
  password: z
    .string()
    .min(8)
    .max(30)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - пароль ящика, 8-30 символов"),
  comment: z.string().optional().describe("Комментарий к ящику (опц.)"),
  owner_full_name: z.string().optional().describe("ФИО владельца (опц.)"),
  filter_status: z
    .boolean()
    .optional()
    .describe("Включить спам-фильтр (опц.)"),
  filter_action: z
    .enum(["directory", "label"])
    .optional()
    .describe(
      "Действие при попадании в спам: directory — в папку Спам, label — пометить. Игнорировать если filter_status=false"
    ),
};

const handler = async (params: {
  domain: string;
  mailbox: string;
  password: string;
  comment?: string;
  owner_full_name?: string;
  filter_status?: boolean;
  filter_action?: "directory" | "label";
}) => {
  try {
    if (params.filter_status === false && params.filter_action !== undefined) {
      return createToolResponse(
        "❌ Нельзя передавать filter_action, если filter_status=false"
      );
    }

    const { domain, ...rest } = params;
    const m = await createMailboxAction(domain, rest);
    const fullAddress =
      m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : `${params.mailbox}@${domain}`;

    return createToolResponse(`✅ Почтовый ящик создан!

📋 Детали:
• Адрес: ${fullAddress}
• ФИО владельца: ${m.owner_full_name || "—"}
• Комментарий: ${m.comment || "—"}
• Спам-фильтр: ${m.filter_status ? "вкл" : "выкл"}${m.filter_status ? `, действие: ${m.filter_action}` : ""}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания почтового ящика. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании ящика");
  }
};

export const createMailboxTool = {
  name: ToolNames.CREATE_MAILBOX,
  title: "Создание почтового ящика",
  description:
    "Создаёт новый почтовый ящик на указанном домене (API v2). Поддерживает задание ФИО владельца и начальных настроек спам-фильтра.",
  inputSchema,
  handler,
};
