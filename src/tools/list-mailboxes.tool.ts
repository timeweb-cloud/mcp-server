import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listMailboxesAction } from "../actions/list-mailboxes.action";

const inputSchema = {};

const handler = async () => {
  try {
    const mailboxes = await listMailboxesAction();

    if (mailboxes.length === 0) {
      return createToolResponse("На аккаунте нет почтовых ящиков.");
    }

    const lines = mailboxes.map((m) => {
      const full = m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : (m.fqdn ?? "—");
      return `• ${full}\n  спам-фильтр: ${m.filter_status ? "вкл" : "выкл"}, webmail: ${m.webmail ? "да" : "нет"}, пересылка: ${m.forward_status ? "вкл" : "выкл"}${m.comment ? `\n  комментарий: ${m.comment}` : ""}`;
    });

    return createToolResponse(
      `Почтовые ящики (${mailboxes.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка почтовых ящиков. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении списка почтовых ящиков"
    );
  }
};

export const listMailboxesTool = {
  name: ToolNames.LIST_MAILBOXES,
  title: "Список всех почтовых ящиков аккаунта",
  description:
    "Возвращает все почтовые ящики аккаунта (API v2). Для каждого ящика: адрес, статусы спам-фильтра, webmail, пересылки, комментарий.",
  inputSchema,
  handler,
};
