import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateMailboxV1Action } from "../actions/update-mailbox-v1.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailbox: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика (часть до @)"),
  password: z.string().optional().describe("Новый пароль (опц.)"),
  comment: z.string().optional().describe("Новый комментарий (опц.)"),
  auto_reply: z
    .any()
    .optional()
    .describe("Автоответчик (v1): объект с is_enabled и message/subject"),
  spam_filter: z
    .any()
    .optional()
    .describe(
      "Спам-фильтр (v1): объект с is_enabled/action/forward_to/white_list"
    ),
  forwarding_incoming: z
    .any()
    .optional()
    .describe(
      "Пересылка входящих (v1): is_enabled/incoming_list/is_delete_messages"
    ),
  forwarding_outgoing: z
    .any()
    .optional()
    .describe("Пересылка исходящих (v1): is_enabled/outgoing_to"),
};

const handler = async (params: {
  domain: string;
  mailbox: string;
  password?: string;
  comment?: string;
  auto_reply?: any;
  spam_filter?: any;
  forwarding_incoming?: any;
  forwarding_outgoing?: any;
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

    const updated = await updateMailboxV1Action(domain, mailbox, body);

    return createToolResponse(
      `✅ Ящик ${mailbox}@${domain} обновлён (API v1). Комментарий: ${updated.comment || "—"}. Спам-фильтр: ${updated.spam_filter?.is_enabled ? "вкл" : "выкл"}. Автоответчик: ${updated.auto_reply?.is_enabled ? "вкл" : "выкл"}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления ящика (v1). Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении ящика (v1)"
    );
  }
};

export const updateMailboxV1Tool = {
  name: ToolNames.UPDATE_MAILBOX_V1,
  title: "Изменение почтового ящика (API v1)",
  description:
    "Обновляет почтовый ящик через API v1. Предпочитай update_mailbox (v2). Использует структурированные блоки auto_reply/spam_filter/forwarding_incoming/forwarding_outgoing.",
  inputSchema,
  handler,
};
