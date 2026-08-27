import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerDiskBackupsAction } from "../actions/list-server-disk-backups.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  disk_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID диска (получить через GET /api/v1/servers/{id}/disks)"
    ),
};

const handler = async (params: { server_id: number; disk_id: number }) => {
  try {
    const backups = await listServerDiskBackupsAction(
      params.server_id,
      params.disk_id
    );

    if (backups.length === 0) {
      return createToolResponse(
        `На диске ${params.disk_id} сервера ${params.server_id} нет бэкапов.`
      );
    }

    const lines = backups.map(
      (b) =>
        `• ID ${b.id} — ${b.name} (${b.type})\n  статус: ${b.status} (progress ${b.progress}%), размер: ${b.size} MB, создан: ${b.created_at}\n  комментарий: ${b.comment ?? "—"}`
    );

    return createToolResponse(
      `Бэкапы диска ${params.disk_id} сервера ${params.server_id} (${backups.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить бэкапы. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении бэкапов");
  }
};

export const listServerDiskBackupsTool = {
  name: ToolNames.LIST_SERVER_DISK_BACKUPS,
  title: "Список бэкапов диска сервера",
  description:
    "Возвращает список бэкапов (manual + auto) конкретного диска VPS-сервера. Бэкапы в Timeweb Cloud — это снапшоты на уровне диска, а не всего сервера. Для получения disk_id сначала запроси список дисков сервера через API.",
  inputSchema,
  handler,
};
