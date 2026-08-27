import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerPresetsAction } from "../actions/list-server-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await listServerPresetsAction();

    if (presets.length === 0) {
      return createToolResponse("Тарифы серверов не найдены.");
    }

    const lines = presets.map((p) => {
      const ramGb = (p.ram / 1024).toFixed(1);
      const diskGb = (p.disk / 1024).toFixed(1);
      const tags = p.tags && p.tags.length ? ` [${p.tags.join(", ")}]` : "";
      return (
        `• ID ${p.id} — ${p.description_short}${tags}\n` +
        `  💰 ${p.price}₽/мес | 📍 ${p.location}\n` +
        `  🖥️ CPU: ${p.cpu} × ${p.cpu_frequency}GHz | 💾 RAM: ${ramGb} GB | 💿 Диск: ${diskGb} GB (${p.disk_type})\n` +
        `  🌐 Канал: ${p.bandwidth} Мбит/с | Локальная сеть: ${p.is_allowed_local_network ? "да" : "нет"}`
      );
    });

    return createToolResponse(
      `📋 Тарифы VPS-серверов (${presets.length}):\n\n${lines.join("\n\n")}\n\n💡 Используйте ID тарифа при создании сервера в поле preset_id.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов серверов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении тарифов");
  }
};

export const listServerPresetsTool = {
  name: ToolNames.LIST_SERVER_PRESETS,
  title: "Список тарифов VPS-серверов",
  description:
    "Возвращает все доступные тарифы (пресеты) для VPS-серверов: ID, цена, локация, CPU, RAM, диск, тип диска, пропускная способность. Используй перед созданием VPS, чтобы выбрать preset_id. Это справочник VPS-тарифов (НЕ пресеты для приложений — для них есть get_allowed_presets).",
  inputSchema,
  handler,
};
