import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getServerAction } from "../actions/get-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера (получить через list_servers)"),
};

const handler = async (params: { server_id: number }) => {
  try {
    const server = await getServerAction(params.server_id);
    return createToolResponse(
      `Сервер ${server.id} — ${server.name}\n\n` +
        `Статус: ${server.status}\n` +
        `Локация: ${server.location}\n` +
        `CPU: ${server.cpu} ядер (${server.cpu_frequency})\n` +
        `RAM: ${server.ram} MB\n` +
        `ОС: ${server.os?.name ?? "—"} ${server.os?.version ?? ""}\n` +
        `IPv4: ${server.main_ipv4 ?? "—"}\n` +
        `IPv6: ${server.main_ipv6 ?? "—"}\n` +
        `Preset ID: ${server.preset_id ?? "—"}, Configurator ID: ${server.configurator_id ?? "—"}\n` +
        `Boot mode: ${server.boot_mode}\n` +
        `Создан: ${server.created_at}\n` +
        `Комментарий: ${server.comment || "—"}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении сервера");
  }
};

export const getServerTool = {
  name: ToolNames.GET_SERVER,
  title: "Получение сервера",
  description:
    "Возвращает детальную информацию по конкретному VPS-серверу: статус, конфигурация CPU/RAM, ОС, IP-адреса, preset/configurator ID. Использовать когда нужны подробности по одному серверу (количество ядер для расчёта нагрузки, текущий статус перед операцией).",
  inputSchema,
  handler,
};
