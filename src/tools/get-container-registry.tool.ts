import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getContainerRegistryAction } from "../actions/get-container-registry.action";

const inputSchema = {
  registry_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID реестра (получить через list_container_registries)"
    ),
};

const handler = async (params: { registry_id: number }) => {
  try {
    const r = await getContainerRegistryAction(params.registry_id);
    return createToolResponse(
      `Реестр контейнеров ${r.id} — ${r.name}\n\n` +
        `Описание: ${r.description || "—"}\n` +
        `Preset ID: ${r.preset_id}\n` +
        `Configurator ID: ${r.configurator_id}\n` +
        `Project ID: ${r.project_id}\n` +
        `Диск: ${r.disk_stats.used}/${r.disk_stats.size} ГБ (использовано/всего)\n` +
        `Создан: ${new Date(r.created_at).toLocaleString("ru-RU")}\n` +
        `Обновлён: ${new Date(r.updated_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения реестра ${params.registry_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении реестра");
  }
};

export const getContainerRegistryTool = {
  name: ToolNames.GET_CONTAINER_REGISTRY,
  title: "Получение информации о реестре контейнеров",
  description:
    "Возвращает детальную информацию о конкретном реестре контейнеров по ID: имя, описание, тариф, использование диска, дата создания и обновления.",
  inputSchema,
  handler,
};
