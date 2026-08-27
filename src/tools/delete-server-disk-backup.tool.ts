import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteServerDiskBackupAction } from "../actions/delete-server-disk-backup.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  disk_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID диска"),
  backup_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID бэкапа для удаления"),
};

const handler = async (params: {
  server_id: number;
  disk_id: number;
  backup_id: number;
}) => {
  try {
    await deleteServerDiskBackupAction(
      params.server_id,
      params.disk_id,
      params.backup_id
    );
    return createToolResponse(
      `✅ Бэкап ${params.backup_id} удалён с диска ${params.disk_id} сервера ${params.server_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить бэкап ${params.backup_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении бэкапа");
  }
};

export const deleteServerDiskBackupTool = {
  name: ToolNames.DELETE_SERVER_DISK_BACKUP,
  title: "Удаление бэкапа диска",
  description:
    "Удаляет бэкап диска сервера. Действие необратимо. Перед удалением стоит убедиться через list_server_disk_backups что это не последний актуальный бэкап.",
  inputSchema,
  handler,
};
