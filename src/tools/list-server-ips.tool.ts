import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerIpsAction } from "../actions/list-server-ips.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
};

const handler = async (params: { server_id: number }) => {
  try {
    const ips = await listServerIpsAction(params.server_id);
    if (ips.length === 0) {
      return createToolResponse(
        `У сервера ${params.server_id} нет IP-адресов.`
      );
    }
    const lines = ips.map(
      (ip) =>
        `• ${ip.type.toUpperCase()} ${ip.ip}${ip.is_main ? " (main)" : ""} — PTR: ${ip.ptr || "—"}`
    );
    return createToolResponse(
      `IP-адреса сервера ${params.server_id} (${ips.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить список IP сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении IP");
  }
};

export const listServerIpsTool = {
  name: ToolNames.LIST_SERVER_IPS,
  title: "Список IP-адресов сервера",
  description:
    "Возвращает все IPv4 и IPv6 адреса, назначенные серверу, включая PTR-записи и признак основного IP.",
  inputSchema,
  handler,
};
