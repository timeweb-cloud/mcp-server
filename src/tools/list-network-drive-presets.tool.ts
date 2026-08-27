import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listNetworkDrivePresetsAction } from "../actions/list-network-drive-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await listNetworkDrivePresetsAction();

    if (presets.length === 0) {
      return createToolResponse(
        "💡 Нет доступных тарифов для сетевого диска."
      );
    }

    const lines = presets.map(
      (p) =>
        `• ID ${p.id} — тип ${p.type}, цена: ${p.cost_per_gb}/ГБ, размер: ${p.min}–${p.max} ГБ (шаг ${p.step})\n  IOPS чтение: ${p.read?.min ?? "—"}–${p.read?.max ?? "—"}, запись: ${p.write?.min ?? "—"}–${p.write?.max ?? "—"}`
    );

    return createToolResponse(
      `📋 Тарифы сетевых дисков (${presets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка тарифов сетевых дисков. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении тарифов сетевых дисков"
    );
  }
};

export const listNetworkDrivePresetsTool = {
  name: ToolNames.LIST_NETWORK_DRIVE_PRESETS,
  title: "Список тарифов сетевых дисков",
  description:
    "Возвращает список доступных тарифов (preset) для сетевых дисков с ценой за ГБ, допустимым диапазоном размеров и IOPS. Используй перед create_network_drive для выбора preset_id.",
  inputSchema,
  handler,
};
