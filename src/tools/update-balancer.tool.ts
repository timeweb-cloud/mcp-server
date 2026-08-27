import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateBalancerAction } from "../actions/update-balancer.action";
import { UpdateBalancerRequestDto } from "../types/dto/update-balancer-request.dto";

const BalancerProtoEnum = z.enum(["http", "http2", "https", "tcp"]);
const BalancerAlgoEnum = z.enum(["roundrobin", "leastconn"]);

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  name: z.string().optional().describe("Новое имя (опц.)"),
  algo: BalancerAlgoEnum.optional().describe("Алгоритм (опц.)"),
  is_sticky: z.boolean().optional().describe("Сохранять сессию (опц.)"),
  is_use_proxy: z.boolean().optional().describe("Использовать прокси (опц.)"),
  is_ssl: z.boolean().optional().describe("Перенаправление на SSL (опц.)"),
  is_keepalive: z.boolean().optional().describe("Keepalive (опц.)"),
  proto: BalancerProtoEnum.optional().describe("Протокол (опц.)"),
  port: z.number().optional().describe("Порт (опц.)"),
  path: z.string().optional().describe("Путь (опц.)"),
  inter: z.number().optional().describe("Интервал проверки (опц.)"),
  timeout: z.number().optional().describe("Таймаут ответа (опц.)"),
  fall: z.number().optional().describe("Порог ошибок (опц.)"),
  rise: z.number().optional().describe("Порог успешных (опц.)"),
  maxconn: z.number().optional().describe("Макс. соединений (опц.)"),
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
  comment: z.string().optional().describe("Комментарий (опц.)"),
  certificate_type: z
    .enum(["lets_encrypt", "custom"])
    .optional()
    .describe("Тип SSL-сертификата (опц.)"),
  certificate_fqdn: z.string().optional().describe("FQDN (опц.)"),
  certificate_cert_data: z
    .string()
    .optional()
    .describe("PEM-данные сертификата (опц.)"),
  certificate_key_data: z
    .string()
    .optional()
    .describe("PEM-данные приватного ключа (опц.)"),
};

const handler = async (params: {
  balancer_id: number;
  name?: string;
  algo?: "roundrobin" | "leastconn";
  is_sticky?: boolean;
  is_use_proxy?: boolean;
  is_ssl?: boolean;
  is_keepalive?: boolean;
  proto?: "http" | "http2" | "https" | "tcp";
  port?: number;
  path?: string;
  inter?: number;
  timeout?: number;
  fall?: number;
  rise?: number;
  maxconn?: number;
  connect_timeout?: number;
  client_timeout?: number;
  server_timeout?: number;
  httprequest_timeout?: number;
  comment?: string;
  certificate_type?: "lets_encrypt" | "custom";
  certificate_fqdn?: string;
  certificate_cert_data?: string;
  certificate_key_data?: string;
}) => {
  try {
    const payload: UpdateBalancerRequestDto = {};
    const copyIfSet = <K extends keyof UpdateBalancerRequestDto>(k: K) => {
      const v = (params as any)[k];
      if (typeof v !== "undefined") (payload as any)[k] = v;
    };

    (
      [
        "name",
        "algo",
        "is_sticky",
        "is_use_proxy",
        "is_ssl",
        "is_keepalive",
        "proto",
        "port",
        "path",
        "inter",
        "timeout",
        "fall",
        "rise",
        "maxconn",
        "connect_timeout",
        "client_timeout",
        "server_timeout",
        "httprequest_timeout",
        "comment",
      ] as const
    ).forEach(copyIfSet);

    if (params.certificate_type) {
      payload.certificates = {
        type: params.certificate_type,
        fqdn: params.certificate_fqdn,
        cert_data: params.certificate_cert_data,
        key_data: params.certificate_key_data,
      };
    }

    if (Object.keys(payload).length === 0) {
      return createToolResponse(
        "⚠️ Не указано ни одно поле для обновления балансировщика."
      );
    }

    const b = await updateBalancerAction(params.balancer_id, payload);

    return createToolResponse(`✅ Балансировщик ${b.id} обновлён.

• Имя: ${b.name}
• Статус: ${b.status}
• Протокол/Порт: ${b.proto}:${b.port}
• Алгоритм: ${b.algo}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении балансировщика"
    );
  }
};

export const updateBalancerTool = {
  name: ToolNames.UPDATE_BALANCER,
  title: "Обновление балансировщика",
  description:
    "Обновляет параметры существующего балансировщика. Все поля кроме balancer_id — опциональные; передавай только то, что меняется.",
  inputSchema,
  handler,
};
