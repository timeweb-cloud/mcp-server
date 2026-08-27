import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { unmountNetworkDriveAction } from "../actions/unmount-network-drive.action";

const inputSchema = {
  network_drive_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сетевого диска (UUID)"),
};

const handler = async (params: { network_drive_id: string }) => {
  try {
    await unmountNetworkDriveAction(params.network_drive_id);
    return createToolResponse(
      `✅ Сетевой диск ${params.network_drive_id} отключён от сервиса.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось отключить сетевой диск ${params.network_drive_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при отключении сетевого диска"
    );
  }
};

export const unmountNetworkDriveTool = {
  name: ToolNames.UNMOUNT_NETWORK_DRIVE,
  title: "Отключение сетевого диска от сервиса",
  description:
    "Отключает сетевой диск от сервиса (сервера), к которому он был подключён. Перед удалением диска его нужно отключить.",
  inputSchema,
  handler,
};
