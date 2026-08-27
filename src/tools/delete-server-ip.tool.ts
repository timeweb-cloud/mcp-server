import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteServerIpAction } from "../actions/delete-server-ip.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  ip: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - IP-адрес (IPv4 или IPv6), который удалить"),
};

const handler = async (params: { server_id: number; ip: string }) => {
  try {
    await deleteServerIpAction(params.server_id, params.ip);
    return createToolResponse(
      `✅ IP-адрес ${params.ip} удалён с сервера ${params.server_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить IP ${params.ip} с сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении IP");
  }
};

export const deleteServerIpTool = {
  name: ToolNames.DELETE_SERVER_IP,
  title: "Удаление IP-адреса сервера",
  description:
    "Удаляет конкретный IP-адрес (IPv4 или IPv6) с сервера. Основной IP удалить нельзя.",
  inputSchema,
  handler,
};
