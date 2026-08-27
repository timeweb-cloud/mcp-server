import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDnsRecordAction } from "../actions/update-dns-record.action";
import { CreateDnsRecordV2RequestDto } from "../types/dto/create-dns-record-request.dto";

const DNS_TYPES = ["A", "AAAA", "TXT", "CNAME", "MX", "SRV"] as const;

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
  record_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID DNS-записи для обновления"),
  type: z
    .enum(DNS_TYPES)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип DNS-записи"),
  value: z.string().optional().describe("Новое значение DNS-записи"),
  ttl: z.number().optional().describe("Новый TTL в секундах"),
  priority: z.number().optional().describe("Приоритет (MX, SRV)"),
  subdomain: z
    .string()
    .optional()
    .describe("Имя поддомена (только префикс)"),
  app_id: z.number().optional().describe("ID приложения App Platform"),
  host: z.string().optional().describe("SRV: хост сервиса"),
  port: z.number().optional().describe("SRV: порт"),
  service: z.string().optional().describe("SRV: имя сервиса"),
  protocol: z.string().optional().describe("SRV: протокол"),
};

const handler = async (params: {
  fqdn: string;
  record_id: number;
  type: (typeof DNS_TYPES)[number];
  value?: string;
  ttl?: number;
  priority?: number;
  subdomain?: string;
  app_id?: number;
  host?: string;
  port?: number;
  service?: string;
  protocol?: string;
}) => {
  try {
    const body: CreateDnsRecordV2RequestDto = { type: params.type };
    if (params.value !== undefined) body.value = params.value;
    if (params.ttl !== undefined) body.ttl = params.ttl;
    if (params.priority !== undefined) body.priority = params.priority;
    if (params.subdomain !== undefined) body.subdomain = params.subdomain;
    if (params.app_id !== undefined) body.app_id = params.app_id;
    if (params.host !== undefined) body.host = params.host;
    if (params.port !== undefined) body.port = params.port;
    if (params.service !== undefined) body.service = params.service;
    if (params.protocol !== undefined) body.protocol = params.protocol;

    const record = await updateDnsRecordAction(
      params.fqdn,
      params.record_id,
      body
    );

    return createToolResponse(`✅ DNS-запись обновлена!
• ID: ${record.id ?? params.record_id}
• Тип: ${record.type}
• Значение: ${record.data.value ?? "—"}
• TTL: ${record.ttl ?? "default"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления DNS-записи ${params.record_id} для "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении DNS-записи"
    );
  }
};

export const updateDnsRecordTool = {
  name: ToolNames.UPDATE_DNS_RECORD,
  title: "Обновление DNS-записи",
  description:
    "Обновляет существующую DNS-запись по ID. Использует API v2. Нужно передать тип записи и новые поля.",
  inputSchema,
  handler,
};
