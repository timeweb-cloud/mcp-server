import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listContainerRegistryPresetsAction } from "../actions/list-container-registry-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await listContainerRegistryPresetsAction();

    if (presets.length === 0) {
      return createToolResponse("Тарифы реестров контейнеров не найдены.");
    }

    const lines = presets.map(
      (p) =>
        `• ID ${p.id} — ${p.description_short}\n  диск: ${p.disk} ГБ, цена: ${p.price} руб, локация: ${p.location ?? "—"}\n  описание: ${p.description}`
    );

    return createToolResponse(
      `Тарифы реестров контейнеров (${presets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов реестров. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении тарифов реестров"
    );
  }
};

export const listContainerRegistryPresetsTool = {
  name: ToolNames.LIST_CONTAINER_REGISTRY_PRESETS,
  title: "Список тарифов реестров контейнеров",
  description:
    "Возвращает список доступных тарифов для реестров контейнеров (Container Registry): ID, описание, размер диска, цена, локация. Используй перед create_container_registry, чтобы выбрать preset_id.",
  inputSchema,
  handler,
};
