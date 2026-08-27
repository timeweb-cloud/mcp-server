import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerDisksAction } from "../actions/list-server-disks.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
};

const handler = async (params: { server_id: number }) => {
  try {
    const disks = await listServerDisksAction(params.server_id);

    if (disks.length === 0) {
      return createToolResponse(`На сервере ${params.server_id} нет дисков.`);
    }

    const lines = disks.map(
      (d) =>
        `• ID ${d.id} — ${d.system_name} (${d.type})\n  размер: ${d.size} MB, использовано: ${d.used} MB\n  статус: ${d.status}, примонтирован: ${d.is_mounted ? "да" : "нет"}, системный: ${d.is_system ? "да" : "нет"}`
    );

    return createToolResponse(
      `Диски сервера ${params.server_id} (${disks.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить диски сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении дисков");
  }
};

export const listServerDisksTool = {
  name: ToolNames.LIST_SERVER_DISKS,
  title: "Список дисков сервера",
  description:
    "Возвращает список дисков сервера с ID, размером, загрузкой и статусом. Используй перед операциями с бэкапами — disk_id нужен для list_server_disk_backups и create_server_disk_backup.",
  inputSchema,
  handler,
};
