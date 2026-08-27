import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listMailboxesByDomainAction } from "../actions/list-mailboxes-by-domain.action";

const inputSchema = {
  domain: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена (например: example.com)"),
};

const handler = async (params: { domain: string }) => {
  try {
    const mailboxes = await listMailboxesByDomainAction(params.domain);

    if (mailboxes.length === 0) {
      return createToolResponse(
        `На домене ${params.domain} почтовых ящиков нет.`
      );
    }

    const lines = mailboxes.map((m) => {
      const full = m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : (m.mailbox ?? "—");
      return `• ${full}${m.comment ? ` — ${m.comment}` : ""}`;
    });

    return createToolResponse(
      `Почтовые ящики домена ${params.domain} (${mailboxes.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения ящиков домена. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении ящиков домена"
    );
  }
};

export const listMailboxesByDomainTool = {
  name: ToolNames.LIST_MAILBOXES_BY_DOMAIN,
  title: "Список почтовых ящиков домена",
  description:
    "Возвращает список почтовых ящиков указанного домена (API v1). Используй, когда нужны только ящики конкретного домена.",
  inputSchema,
  handler,
};
