import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateMailboxAction } from "../actions/update-mailbox.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailbox: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика (часть до @)"),
  password: z
    .string()
    .min(8)
    .max(30)
    .optional()
    .describe("Новый пароль (8-30 символов, опц.)"),
  comment: z.string().optional().describe("Новый комментарий (опц.)"),
  owner_full_name: z
    .string()
    .optional()
    .describe("Новое ФИО владельца (опц.)"),
  spam_protection_settings: z
    .any()
    .optional()
    .describe(
      "Спам-фильтр. Объект с is_enabled и (при вкл.) полями action/forward_to/white_list. Детали см. в OpenAPI schema spam-protection-is-enabled/-is-disabled"
    ),
  forward_settings: z
    .any()
    .optional()
    .describe(
      "Пересылка входящих. Объект с is_enabled и (при вкл.) incoming_list/is_delete_messages"
    ),
  autoreply_settings: z
    .any()
    .optional()
    .describe(
      "Автоответчик. Объект с is_enabled и (при вкл.) message/subject"
    ),
  outgoing_settings: z
    .any()
    .optional()
    .describe("Пересылка исходящих. Объект с is_enabled и (при вкл.) outgoing_to"),
};

const handler = async (params: {
  domain: string;
  mailbox: string;
  password?: string;
  comment?: string;
  owner_full_name?: string;
  spam_protection_settings?: any;
  forward_settings?: any;
  autoreply_settings?: any;
  outgoing_settings?: any;
}) => {
  try {
    const { domain, mailbox, ...rest } = params;
    const body = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined)
    );

    if (Object.keys(body).length === 0) {
      return createToolResponse(
        "❌ Нужно передать хотя бы одно поле для обновления."
      );
    }

    const updated = await updateMailboxAction(domain, mailbox, body);

    return createToolResponse(`✅ Ящик ${mailbox}@${domain} обновлён.

📋 Актуальное состояние:
• Комментарий: ${updated.comment || "—"}
• ФИО владельца: ${updated.owner_full_name || "—"}
• Спам-фильтр: ${updated.filter_status ? "вкл" : "выкл"}
• Пересылка входящих: ${updated.forward_status ? "вкл" : "выкл"}
• Автоответчик: ${updated.autoreply_status ? "вкл" : "выкл"}
• Пересылка исходящих: ${updated.outgoing_control ? "вкл" : "выкл"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления ящика. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении ящика");
  }
};

export const updateMailboxTool = {
  name: ToolNames.UPDATE_MAILBOX,
  title: "Изменение почтового ящика",
  description:
    "Обновляет почтовый ящик (API v2): пароль, комментарий, ФИО, спам-фильтр, автоответчик, пересылки. Передавай только изменяемые поля. Сложные блоки (spam/forward/autoreply/outgoing) принимают объект с is_enabled и дополнительными полями при включении.",
  inputSchema,
  handler,
};
