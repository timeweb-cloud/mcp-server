import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createBalancerAction } from "../actions/create-balancer.action";
import { CreateBalancerRequestDto } from "../types/dto/create-balancer-request.dto";

const BalancerProtoEnum = z.enum(["http", "http2", "https", "tcp"]);
const BalancerAlgoEnum = z.enum(["roundrobin", "leastconn"]);

const inputSchema = {
  name: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя балансировщика (уникальное в аккаунте)"),
  algo: BalancerAlgoEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - алгоритм балансировки: roundrobin | leastconn"
  ),
  is_sticky: z
    .boolean()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - сохранять ли сессию"),
  is_use_proxy: z
    .boolean()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - выступает ли балансировщик в роли прокси"
    ),
  is_ssl: z
    .boolean()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - требуется ли перенаправление на SSL"),
  is_keepalive: z
    .boolean()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - выдавать ли сигнал keepalive"),
  proto: BalancerProtoEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол: http | http2 | https | tcp"
  ),
  path: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - путь health-check (напр. /)"),
  inter: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - интервал проверки"),
  timeout: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - таймаут ответа балансировщика"),
  fall: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - порог количества ошибок"),
  rise: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - порог количества успешных ответов"),
  preset_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID тарифа (получить через list_balancer_presets)"
    ),
  port: z.number().optional().describe("Порт балансировщика (опц.)"),
  maxconn: z
    .number()
    .optional()
    .describe("Максимальное количество соединений (опц.)"),
  connect_timeout: z
    .number()
    .optional()
    .describe("Таймаут подключения (опц.)"),
  client_timeout: z.number().optional().describe("Таймаут клиента (опц.)"),
  server_timeout: z.number().optional().describe("Таймаут сервера (опц.)"),
  httprequest_timeout: z
    .number()
    .optional()
    .describe("Таймаут HTTP-запроса (опц.)"),
  availability_zone: z
    .string()
    .optional()
    .describe(
      "Зона доступности (опц.): spb-1, spb-2, spb-3, spb-4, msk-1, nsk-1, ams-1, ala-1, fra-1"
    ),
  project_id: z.number().optional().describe("ID проекта (опц.)"),
  network_id: z
    .string()
    .optional()
    .describe("ID приватной сети VPC (опц.)"),
  network_floating_ip: z
    .string()
    .optional()
    .describe("Плавающий IP в приватной сети (опц.)"),
  network_local_ip: z
    .string()
    .optional()
    .describe("Локальный IP в приватной сети (опц.)"),
  certificate_type: z
    .enum(["lets_encrypt", "custom"])
    .optional()
    .describe("Тип SSL-сертификата (опц.)"),
  certificate_fqdn: z
    .string()
    .optional()
    .describe("FQDN для сертификата (опц.)"),
  certificate_cert_data: z
    .string()
    .optional()
    .describe("PEM-данные сертификата (только для custom)"),
  certificate_key_data: z
    .string()
    .optional()
    .describe("PEM-данные приватного ключа (только для custom)"),
};

const handler = async (params: {
  name: string;
  algo: "roundrobin" | "leastconn";
  is_sticky: boolean;
  is_use_proxy: boolean;
  is_ssl: boolean;
  is_keepalive: boolean;
  proto: "http" | "http2" | "https" | "tcp";
  path: string;
  inter: number;
  timeout: number;
  fall: number;
  rise: number;
  preset_id: number;
  port?: number;
  maxconn?: number;
  connect_timeout?: number;
  client_timeout?: number;
  server_timeout?: number;
  httprequest_timeout?: number;
  availability_zone?: string;
  project_id?: number;
  network_id?: string;
  network_floating_ip?: string;
  network_local_ip?: string;
  certificate_type?: "lets_encrypt" | "custom";
  certificate_fqdn?: string;
  certificate_cert_data?: string;
  certificate_key_data?: string;
}) => {
  try {
    const payload: CreateBalancerRequestDto = {
      name: params.name,
      algo: params.algo,
      is_sticky: params.is_sticky,
      is_use_proxy: params.is_use_proxy,
      is_ssl: params.is_ssl,
      is_keepalive: params.is_keepalive,
      proto: params.proto,
      path: params.path,
      inter: params.inter,
      timeout: params.timeout,
      fall: params.fall,
      rise: params.rise,
      preset_id: params.preset_id,
    };

    if (typeof params.port === "number") payload.port = params.port;
    if (typeof params.maxconn === "number") payload.maxconn = params.maxconn;
    if (typeof params.connect_timeout === "number")
      payload.connect_timeout = params.connect_timeout;
    if (typeof params.client_timeout === "number")
      payload.client_timeout = params.client_timeout;
    if (typeof params.server_timeout === "number")
      payload.server_timeout = params.server_timeout;
    if (typeof params.httprequest_timeout === "number")
      payload.httprequest_timeout = params.httprequest_timeout;
    if (params.availability_zone)
      payload.availability_zone = params.availability_zone;
    if (typeof params.project_id === "number")
      payload.project_id = params.project_id;

    if (params.network_id) {
      payload.network = {
        id: params.network_id,
        floating_ip: params.network_floating_ip,
        local_ip: params.network_local_ip,
      };
    }

    if (params.certificate_type) {
      payload.certificates = {
        type: params.certificate_type,
        fqdn: params.certificate_fqdn,
        cert_data: params.certificate_cert_data,
        key_data: params.certificate_key_data,
      };
    }

    const b = await createBalancerAction(payload);

    return createToolResponse(`✅ Балансировщик успешно создан!

📋 Детали:
• ID: ${b.id}
• Имя: ${b.name}
• Статус: ${b.status}
• Протокол/Порт: ${b.proto}:${b.port}
• Алгоритм: ${b.algo}
• Локация: ${b.location}, зона: ${b.availability_zone}
• IP: ${b.ip ?? "—"}
• Preset: ${b.preset_id}
• Создан: ${new Date(b.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания балансировщика. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании балансировщика"
    );
  }
};

export const createBalancerTool = {
  name: ToolNames.CREATE_BALANCER,
  title: "Создание балансировщика",
  description:
    "Создаёт новый балансировщик нагрузки. Обязательны: name, algo, is_sticky, is_use_proxy, is_ssl, is_keepalive, proto, path, inter, timeout, fall, rise, preset_id. preset_id получай через list_balancer_presets. Для приватной сети задай network_id. Для SSL — certificate_type.",
  inputSchema,
  handler,
};
