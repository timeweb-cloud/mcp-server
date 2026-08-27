import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addServerIpAction } from "../actions/add-server-ip.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  type: z
    .enum(["ipv4", "ipv6"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип IP-адреса: ipv4 или ipv6"),
  ptr: z.string().optional().describe("PTR-запись для нового IP (опц.)"),
};

const handler = async (params: {
  server_id: number;
  type: "ipv4" | "ipv6";
  ptr?: string;
}) => {
  try {
    const ip = await addServerIpAction(params.server_id, {
      type: params.type,
      ...(params.ptr !== undefined && { ptr: params.ptr }),
    });
    return createToolResponse(
      `✅ IP-адрес добавлен на сервер ${params.server_id}.\n` +
        `• ${ip.type.toUpperCase()} ${ip.ip}\n` +
        `• PTR: ${ip.ptr || "—"}\n` +
        `• Основной: ${ip.is_main ? "да" : "нет"}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить IP на сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при добавлении IP");
  }
};

export const addServerIpTool = {
  name: ToolNames.ADD_SERVER_IP,
  title: "Добавление IP-адреса сервера",
  description:
    "Выделяет новый IPv4 или IPv6 адрес для сервера. Опционально можно задать PTR-запись.",
  inputSchema,
  handler,
};
