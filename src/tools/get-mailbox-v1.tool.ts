import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getMailboxV1Action } from "../actions/get-mailbox-v1.action";

const inputSchema = {
  domain: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена (например: example.com)"),
  mailbox: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика (часть до @)"),
};

const handler = async (params: { domain: string; mailbox: string }) => {
  try {
    const m = await getMailboxV1Action(params.domain, params.mailbox);

    const fullAddress =
      m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : params.mailbox;

    return createToolResponse(`📋 Почтовый ящик ${fullAddress} (API v1):

• Комментарий: ${m.comment || "—"}
• Спам-фильтр: ${m.spam_filter?.is_enabled ? "вкл" : "выкл"}, действие: ${m.spam_filter?.action ?? "—"}${m.spam_filter?.forward_to ? `, пересылка на: ${m.spam_filter.forward_to}` : ""}
• Пересылка входящих: ${m.forwarding_incoming?.is_enabled ? "вкл" : "выкл"} → ${m.forwarding_incoming?.incoming_list?.join(", ") || "—"}
• Пересылка исходящих: ${m.forwarding_outgoing?.is_enabled ? "вкл" : "выкл"} → ${m.forwarding_outgoing?.outgoing_to || "—"}
• Автоответчик: ${m.auto_reply?.is_enabled ? "вкл" : "выкл"}${m.auto_reply?.subject ? `, тема: "${m.auto_reply.subject}"` : ""}
• Webmail: ${m.webmail ? "да" : "нет"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения ящика (v1). Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении ящика (v1)"
    );
  }
};

export const getMailboxV1Tool = {
  name: ToolNames.GET_MAILBOX_V1,
  title: "Получение почтового ящика (API v1)",
  description:
    "Возвращает данные одного почтового ящика в формате API v1 со структурированными блоками auto_reply/spam_filter/forwarding_*.",
  inputSchema,
  handler,
};
