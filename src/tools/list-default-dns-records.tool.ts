import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDefaultDnsRecordsAction } from "../actions/list-default-dns-records.action";

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    const records = await listDefaultDnsRecordsAction(params.fqdn);
    if (records.length === 0) {
      return createToolResponse(
        `У домена ${params.fqdn} нет DNS-записей по умолчанию.`
      );
    }
    const lines = records.map(
      (r) =>
        `• ${r.type}: ${r.data.value ?? "—"} (TTL: ${r.ttl ?? "default"}${r.data.subdomain ? `, поддомен: ${r.data.subdomain}` : ""})`
    );
    return createToolResponse(
      `DNS-записи по умолчанию для ${params.fqdn} (${records.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения DNS-записей по умолчанию для "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении DNS-записей по умолчанию"
    );
  }
};

export const listDefaultDnsRecordsTool = {
  name: ToolNames.LIST_DEFAULT_DNS_RECORDS,
  title: "DNS-записи домена по умолчанию",
  description:
    "Возвращает список DNS-записей по умолчанию для домена или поддомена (системные записи Timeweb).",
  inputSchema,
  handler,
};
