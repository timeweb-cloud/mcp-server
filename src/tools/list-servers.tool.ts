import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServersAction } from "../actions/list-servers.action";

const inputSchema = {};

const handler = async () => {
  try {
    const servers = await listServersAction();

    if (servers.length === 0) {
      return createToolResponse("На аккаунте нет серверов.");
    }

    const lines = servers.map(
      (s) =>
        `• ID ${s.id} — ${s.name}\n  статус: ${s.status}, локация: ${s.location}, CPU: ${s.cpu}, RAM: ${s.ram} MB\n  IPv4: ${s.main_ipv4 ?? "—"}, ОС: ${s.os?.name ?? "—"} ${s.os?.version ?? ""}`
    );

    return createToolResponse(
      `Серверы (${servers.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка серверов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении серверов");
  }
};

export const listServersTool = {
  name: ToolNames.LIST_SERVERS,
  title: "Список серверов",
  description:
    "Возвращает список всех VPS-серверов аккаунта с ключевыми параметрами: ID, имя, статус, локация, количество CPU, размер RAM, основной IPv4, ОС. Используй перед любой операцией над сервером, чтобы получить его ID.",
  inputSchema,
  handler,
};
