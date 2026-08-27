import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createDnsRecordAction } from "../actions/create-dns-record.action";
import { CreateDnsRecordV2RequestDto } from "../types/dto/create-dns-record-request.dto";

const DNS_TYPES = ["A", "AAAA", "TXT", "CNAME", "MX", "SRV"] as const;

const inputSchema = {
  fqdn: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена или поддомена, к которому добавить запись"
    ),
  type: z
    .enum(DNS_TYPES)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип DNS-записи: A, AAAA, TXT, CNAME, MX, SRV"),
  value: z
    .string()
    .optional()
    .describe(
      "Значение DNS-записи. Для A — IPv4, AAAA — IPv6, TXT/CNAME/MX — строка. Для SRV не используется (см. host/port/service/protocol)."
    ),
  ttl: z
    .number()
    .optional()
    .describe("Время жизни записи (TTL) в секундах, например 600"),
  priority: z
    .number()
    .optional()
    .describe("Приоритет (для MX и SRV записей)"),
  subdomain: z
    .string()
    .optional()
    .describe("Имя поддомена (только префикс, без основного домена)"),
  app_id: z
    .number()
    .optional()
    .describe("ID приложения в App Platform (для A-записи с привязкой к app)"),
  host: z
    .string()
    .optional()
    .describe("SRV: каноническое имя хоста, предоставляющего сервис"),
  port: z
    .number()
    .optional()
    .describe("SRV: порт сервиса"),
  service: z
    .string()
    .optional()
    .describe("SRV: имя сервиса, например _sip"),
  protocol: z
    .string()
    .optional()
    .describe("SRV: протокол, например _TCP или _UDP"),
};

const handler = async (params: {
  fqdn: string;
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
    if (params.type !== "SRV" && !params.value) {
      return createToolResponse(
        `❌ Для записи типа ${params.type} поле value обязательно.`
      );
    }
    if (params.type === "SRV") {
      if (!params.host || !params.port || !params.service || !params.protocol) {
        return createToolResponse(
          "❌ Для SRV-записи нужны все поля: host, port, service, protocol."
        );
      }
    }

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

    const record = await createDnsRecordAction(params.fqdn, body);
    return createToolResponse(`✅ DNS-запись создана!
• ID: ${record.id ?? "—"}
• Тип: ${record.type}
• FQDN: ${record.fqdn ?? params.fqdn}
• Значение: ${record.data.value ?? "—"}
• TTL: ${record.ttl ?? "default"}
${record.data.subdomain ? `• Поддомен: ${record.data.subdomain}\n` : ""}${record.data.priority !== undefined ? `• Приоритет: ${record.data.priority}` : ""}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания DNS-записи для "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании DNS-записи");
  }
};

export const createDnsRecordTool = {
  name: ToolNames.CREATE_DNS_RECORD,
  title: "Создание DNS-записи",
  description:
    "Создаёт DNS-запись (A, AAAA, TXT, CNAME, MX, SRV) для домена или поддомена. Использует API v2. Для SRV нужны host/port/service/protocol вместо value.",
  inputSchema,
  handler,
};
