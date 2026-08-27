import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listLocationsAction } from "../actions/list-locations.action";

const inputSchema = {};

const handler = async () => {
  try {
    const locations = await listLocationsAction();

    if (locations.length === 0) {
      return createToolResponse("Локации не найдены.");
    }

    const lines = locations.map(
      (l) =>
        `• ${l.location} (${l.location_code}) — зоны: ${l.availability_zones.join(", ") || "—"}`
    );

    return createToolResponse(
      `🌍 Локации (${locations.length}):\n\n${lines.join("\n")}\n\n💡 Используйте значение location при создании VPS (фильтр по локации для тарифов/конфигураторов) и availability_zone для выбора зоны.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения локаций. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении локаций");
  }
};

export const listLocationsTool = {
  name: ToolNames.LIST_LOCATIONS,
  title: "Список локаций",
  description:
    "Возвращает список доступных локаций и зон доступности: код локации, ISO-код, список availability_zones. Нужен для выбора location/availability_zone при создании VPS.",
  inputSchema,
  handler,
};
