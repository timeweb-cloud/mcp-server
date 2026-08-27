import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listContainerRegistriesAction } from "../actions/list-container-registries.action";

const inputSchema = {};

const handler = async () => {
  try {
    const registries = await listContainerRegistriesAction();

    if (registries.length === 0) {
      return createToolResponse("На аккаунте нет реестров контейнеров.");
    }

    const lines = registries.map(
      (r) =>
        `• ID ${r.id} — ${r.name}\n  описание: ${r.description || "—"}, preset: ${r.preset_id}, проект: ${r.project_id}\n  диск: ${r.disk_stats.used}/${r.disk_stats.size} ГБ, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );

    return createToolResponse(
      `Реестры контейнеров (${registries.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка реестров контейнеров. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении реестров контейнеров"
    );
  }
};

export const listContainerRegistriesTool = {
  name: ToolNames.LIST_CONTAINER_REGISTRIES,
  title: "Список реестров контейнеров",
  description:
    "Возвращает список всех реестров контейнеров (Container Registry) аккаунта: ID, имя, описание, тариф, использование диска, дата создания. Используй перед операциями над реестром, чтобы получить его ID.",
  inputSchema,
  handler,
};
