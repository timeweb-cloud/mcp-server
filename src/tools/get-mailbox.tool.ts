import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getMailboxAction } from "../actions/get-mailbox.action";

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
    const m = await getMailboxAction(params.domain, params.mailbox);

    const fullAddress =
      m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : params.mailbox;

    return createToolResponse(`📋 Почтовый ящик ${fullAddress}:

• Домен (IDN): ${m.idn_name}
• ФИО владельца: ${m.owner_full_name || "—"}
• Комментарий: ${m.comment || "—"}
• Спам-фильтр: ${m.filter_status ? "вкл" : "выкл"}, действие: ${m.filter_action}
• Белый список: ${m.white_list.length ? m.white_list.join(", ") : "—"}
• Пересылка входящих: ${m.forward_status ? "вкл" : "выкл"} → ${m.forward_list.length ? m.forward_list.join(", ") : "—"}
• Пересылка исходящих: ${m.outgoing_control ? "вкл" : "выкл"} → ${m.outgoing_email || "—"}
• Автоответчик: ${m.autoreply_status ? "вкл" : "выкл"}${m.autoreply_subject ? `, тема: "${m.autoreply_subject}"` : ""}
• Webmail: ${m.webmail ? "да" : "нет"}, Dovecot: ${m.dovecot ? "да" : "нет"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения ящика. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении ящика");
  }
};

export const getMailboxTool = {
  name: ToolNames.GET_MAILBOX,
  title: "Получение почтового ящика",
  description:
    "Возвращает подробные данные одного почтового ящика (API v2): владелец, спам-фильтр, пересылки, автоответчик, webmail.",
  inputSchema,
  handler,
};
