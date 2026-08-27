import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getFloatingIpAction } from "../actions/get-floating-ip.action";

const inputSchema = {
  floating_ip_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID плавающего IP (UUID)"),
};

const handler = async (params: { floating_ip_id: string }) => {
  try {
    const ip = await getFloatingIpAction(params.floating_ip_id);

    const bound = ip.resource_type
      ? `${ip.resource_type}${ip.resource_id !== null && ip.resource_id !== undefined ? ` (ID ${ip.resource_id})` : ""}`
      : "не привязан";

    return createToolResponse(`📋 Плавающий IP ${ip.id}

• IP адрес: ${ip.ip ?? "не назначен"}
• Зона доступности: ${ip.availability_zone}
• DDoS Guard: ${ip.is_ddos_guard ? "✅ включён" : "❌ выключен"}
• Привязан к: ${bound}
• Комментарий: ${ip.comment ?? "—"}
• PTR: ${ip.ptr ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при получении плавающего IP. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при получении плавающего IP`);
  }
};

export const getFloatingIpTool = {
  name: ToolNames.GET_FLOATING_IP,
  title: "Получение плавающего IP",
  description: "Возвращает детальную информацию о плавающем IP по его ID",
  inputSchema,
  handler,
};
