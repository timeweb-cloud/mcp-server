import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { mountNetworkDriveAction } from "../actions/mount-network-drive.action";

const inputSchema = {
  network_drive_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сетевого диска (UUID)"),
  resource_type: z
    .enum(["server"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Тип ресурса, к которому подключаем диск (сейчас поддерживается только server)"
    ),
  resource_id: z
    .number()
    .int()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID ресурса (например, ID сервера) — узнать через list_network_drive_available_resources"
    ),
};

const handler = async (params: {
  network_drive_id: string;
  resource_type: "server";
  resource_id: number;
}) => {
  try {
    await mountNetworkDriveAction(params.network_drive_id, {
      resource_type: params.resource_type,
      resource_id: params.resource_id,
    });
    return createToolResponse(
      `✅ Сетевой диск ${params.network_drive_id} подключён к ${params.resource_type}#${params.resource_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось подключить сетевой диск ${params.network_drive_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при подключении сетевого диска"
    );
  }
};

export const mountNetworkDriveTool = {
  name: ToolNames.MOUNT_NETWORK_DRIVE,
  title: "Подключение сетевого диска к сервису",
  description:
    "Подключает сетевой диск к сервису (серверу). Сервис и диск должны быть в одной зоне доступности. Доступные для подключения сервисы можно получить через list_network_drive_available_resources.",
  inputSchema,
  handler,
};
