import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDnsRecordsAction } from "../actions/list-dns-records.action";

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    const records = await listDnsRecordsAction(params.fqdn);
    if (records.length === 0) {
      return createToolResponse(
        `У домена ${params.fqdn} нет пользовательских DNS-записей.`
      );
    }
    const lines = records.map((r) => {
      const parts: string[] = [];
      if (r.data.subdomain) parts.push(`поддомен: ${r.data.subdomain}`);
      if (r.data.priority !== undefined)
        parts.push(`priority: ${r.data.priority}`);
      const extra = parts.length ? `, ${parts.join(", ")}` : "";
      return `• ID ${r.id ?? "—"} — ${r.type}: ${r.data.value ?? "—"} (TTL: ${r.ttl ?? "default"}${extra})`;
    });
    return createToolResponse(
      `DNS-записи домена ${params.fqdn} (${records.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения DNS-записей домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении DNS-записей");
  }
};

export const listDnsRecordsTool = {
  name: ToolNames.LIST_DNS_RECORDS,
  title: "Список DNS-записей домена",
  description:
    "Возвращает все пользовательские DNS-записи домена: ID, тип (A/AAAA/CNAME/MX/TXT/SRV), значение, TTL, поддомен, priority.",
  inputSchema,
  handler,
};
