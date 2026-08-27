import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDedicatedServersAction } from "../actions/list-dedicated-servers.action";

const inputSchema = {};

const handler = async () => {
  try {
    const servers = await listDedicatedServersAction();

    if (servers.length === 0) {
      return createToolResponse("На аккаунте нет выделенных серверов.");
    }

    const lines = servers.map(
      (s) =>
        `• ID ${s.id} — ${s.name}\n  статус: ${s.status}, локация: ${s.location}, preset: ${s.preset_id}\n  CPU: ${s.cpu_description}, RAM: ${s.ram_description}, HDD: ${s.hdd_description}\n  IPv4: ${s.ip ?? "—"}, IPv6: ${s.ipv6 ?? "—"}, цена: ${s.price} руб`
    );

    return createToolResponse(
      `Выделенные серверы (${servers.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка выделенных серверов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении выделенных серверов"
    );
  }
};

export const listDedicatedServersTool = {
  name: ToolNames.LIST_DEDICATED_SERVERS,
  title: "Список выделенных серверов",
  description:
    "Возвращает список всех выделенных (dedicated) серверов аккаунта: ID, имя, статус (installing/installed/on/off), локация, CPU/RAM/HDD описания, IPv4/IPv6, цена. Используй перед операциями над выделенным сервером, чтобы получить его ID.",
  inputSchema,
  handler,
};
