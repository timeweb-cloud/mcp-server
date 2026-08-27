import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listMailboxesV1Action } from "../actions/list-mailboxes-v1.action";

const inputSchema = {};

const handler = async () => {
  try {
    const mailboxes = await listMailboxesV1Action();

    if (mailboxes.length === 0) {
      return createToolResponse("На аккаунте нет почтовых ящиков.");
    }

    const lines = mailboxes.map((m) => {
      const full = m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : (m.fqdn ?? "—");
      const spam = m.spam_filter?.is_enabled ? "вкл" : "выкл";
      const fwd = m.forwarding_incoming?.is_enabled ? "вкл" : "выкл";
      return `• ${full}\n  спам-фильтр: ${spam}, пересылка входящих: ${fwd}${m.comment ? `\n  комментарий: ${m.comment}` : ""}`;
    });

    return createToolResponse(
      `Почтовые ящики (API v1, ${mailboxes.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка почтовых ящиков (v1). Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении списка почтовых ящиков (v1)"
    );
  }
};

export const listMailboxesV1Tool = {
  name: ToolNames.LIST_MAILBOXES_V1,
  title: "Список почтовых ящиков аккаунта (API v1)",
  description:
    "Возвращает все почтовые ящики аккаунта в формате API v1 (с полной детализацией auto_reply/spam_filter/forwarding). Предпочитай list_mailboxes (v2), этот нужен только если требуются v1-поля.",
  inputSchema,
  handler,
};
