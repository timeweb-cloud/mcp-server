import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteNetworkDriveAction } from "../actions/delete-network-drive.action";

const inputSchema = {
  network_drive_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сетевого диска (UUID) для удаления"),
};

const handler = async (params: { network_drive_id: string }) => {
  try {
    await deleteNetworkDriveAction(params.network_drive_id);
    return createToolResponse(
      `✅ Сетевой диск ${params.network_drive_id} удалён. Данные на диске восстановить нельзя.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить сетевой диск ${params.network_drive_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении сетевого диска"
    );
  }
};

export const deleteNetworkDriveTool = {
  name: ToolNames.DELETE_NETWORK_DRIVE,
  title: "Удаление сетевого диска",
  description:
    "Удаляет сетевой диск по ID. Действие необратимо, данные будут потеряны. Перед удалением диск должен быть отключён от всех сервисов (unmount_network_drive).",
  inputSchema,
  handler,
};
