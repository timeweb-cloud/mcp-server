import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listFloatingIpsAction } from "../actions/list-floating-ips.action";

const inputSchema = {};

const handler = async () => {
  try {
    const response = await listFloatingIpsAction();
    const ips = response.ips;

    if (!ips || ips.length === 0) {
      return createToolResponse(
        `💡 Плавающие IP не найдены. Создайте первый с помощью tool ${ToolNames.CREATE_FLOATING_IP}`
      );
    }

    const lines = ips.map((ip) => {
      const bound = ip.resource_type
        ? `${ip.resource_type}${ip.resource_id !== null && ip.resource_id !== undefined ? ` #${ip.resource_id}` : ""}`
        : "не привязан";
      return `• ID ${ip.id} — ${ip.ip ?? "без адреса"} | зона: ${ip.availability_zone} | DDoS: ${ip.is_ddos_guard ? "✅" : "❌"} | привязка: ${bound}${ip.comment ? ` | комментарий: ${ip.comment}` : ""}`;
    });

    return createToolResponse(
      `📋 Плавающие IP (всего: ${response.meta?.total ?? ips.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при получении списка плавающих IP. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при получении списка плавающих IP`
    );
  }
};

export const listFloatingIpsTool = {
  name: ToolNames.LIST_FLOATING_IPS,
  title: "Список плавающих IP",
  description: "Возвращает список всех плавающих IP пользователя с их ID, адресами, зонами и привязкой к сервисам",
  inputSchema,
  handler,
};
