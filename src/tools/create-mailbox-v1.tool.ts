import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createMailboxV1Action } from "../actions/create-mailbox-v1.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailbox: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика (часть до @). Полный адрес будет mailbox@domain"
    ),
  password: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - пароль ящика"),
  comment: z.string().optional().describe("Комментарий к ящику (опц.)"),
};

const handler = async (params: {
  domain: string;
  mailbox: string;
  password: string;
  comment?: string;
}) => {
  try {
    const { domain, ...rest } = params;
    const m = await createMailboxV1Action(domain, rest);
    const fullAddress =
      m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : `${params.mailbox}@${domain}`;

    return createToolResponse(`✅ Почтовый ящик создан (API v1)!

📋 Детали:
• Адрес: ${fullAddress}
• Комментарий: ${m.comment || "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания почтового ящика (v1). Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании ящика (v1)");
  }
};

export const createMailboxV1Tool = {
  name: ToolNames.CREATE_MAILBOX_V1,
  title: "Создание почтового ящика (API v1)",
  description:
    "Создаёт почтовый ящик через API v1. Предпочитай create_mailbox (v2) — этот нужен только для совместимости.",
  inputSchema,
  handler,
};
