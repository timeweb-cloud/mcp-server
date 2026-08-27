import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createServerDiskBackupAction } from "../actions/create-server-disk-backup.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  disk_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID диска"),
  comment: z
    .string()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - комментарий к бэкапу (например, 'before-migration-v2')"
    ),
};

const handler = async (params: {
  server_id: number;
  disk_id: number;
  comment?: string;
}) => {
  try {
    const backup = await createServerDiskBackupAction(
      params.server_id,
      params.disk_id,
      params.comment
    );
    return createToolResponse(
      `✅ Бэкап создан: ID ${backup.id}, имя "${backup.name}", статус: ${backup.status}. Процесс снятия бэкапа идёт асинхронно — повторно проверь статус через list_server_disk_backups.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать бэкап. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании бэкапа");
  }
};

export const createServerDiskBackupTool = {
  name: ToolNames.CREATE_SERVER_DISK_BACKUP,
  title: "Создание бэкапа диска",
  description:
    "Создаёт ручной бэкап диска VPS. Процесс асинхронный: tool возвращается сразу, статус бэкапа переходит create → done в течение нескольких минут. Используй перед рискованными операциями (миграция, обновление ОС).",
  inputSchema,
  handler,
};
