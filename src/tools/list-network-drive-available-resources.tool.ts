import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listNetworkDriveAvailableResourcesAction } from "../actions/list-network-drive-available-resources.action";

const inputSchema = {};

const handler = async () => {
  try {
    const resources = await listNetworkDriveAvailableResourcesAction();

    if (resources.length === 0) {
      return createToolResponse(
        "💡 Нет сервисов, доступных для подключения сетевого диска."
      );
    }

    const lines = resources.map(
      (r) =>
        `• ${r.resource_type}#${r.resource_id} — зона: ${r.availability_zone}, IP: ${r.ip ?? "—"}`
    );

    return createToolResponse(
      `📋 Сервисы, доступные для подключения сетевого диска (${resources.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка доступных сервисов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении доступных сервисов"
    );
  }
};

export const listNetworkDriveAvailableResourcesTool = {
  name: ToolNames.LIST_NETWORK_DRIVE_AVAILABLE_RESOURCES,
  title: "Список сервисов для подключения сетевого диска",
  description:
    "Возвращает список сервисов (серверов), к которым можно подключить сетевой диск. Используй перед mount_network_drive, чтобы узнать допустимые resource_id.",
  inputSchema,
  handler,
};
