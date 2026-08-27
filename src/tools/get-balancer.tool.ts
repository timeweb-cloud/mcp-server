import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getBalancerAction } from "../actions/get-balancer.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
};

const handler = async (params: { balancer_id: number }) => {
  try {
    const b = await getBalancerAction(params.balancer_id);

    return createToolResponse(`📋 Балансировщик ${b.id} — ${b.name}

• Статус: ${b.status}
• Протокол/Порт: ${b.proto}:${b.port}
• Алгоритм: ${b.algo}
• IP: ${b.ip ?? "—"} (локальный: ${b.local_ip ?? "—"})
• Локация: ${b.location}, зона: ${b.availability_zone}
• Путь health-check: ${b.path}
• SSL: ${b.is_ssl ? "да" : "нет"}, Sticky: ${b.is_sticky ? "да" : "нет"}, Keepalive: ${b.is_keepalive ? "да" : "нет"}, Proxy: ${b.is_use_proxy ? "да" : "нет"}
• Таймауты: inter=${b.inter}, timeout=${b.timeout}, connect=${b.connect_timeout}, client=${b.client_timeout}, server=${b.server_timeout}, http=${b.httprequest_timeout}
• Пороги: fall=${b.fall}, rise=${b.rise}, maxconn=${b.maxconn}
• Preset: ${b.preset_id}, Project: ${b.project_id}
• Правил: ${b.rules?.length ?? 0}
• Привязанные IP (${b.ips?.length ?? 0}): ${b.ips?.join(", ") || "—"}
• Создан: ${new Date(b.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении балансировщика"
    );
  }
};

export const getBalancerTool = {
  name: ToolNames.GET_BALANCER,
  title: "Получение балансировщика",
  description:
    "Возвращает детальную информацию о балансировщике по ID: статус, протокол, порт, алгоритм, таймауты, сертификаты, правила, IP-адреса.",
  inputSchema,
  handler,
};
