import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listContainerRegistryRepositoriesAction } from "../actions/list-container-registry-repositories.action";

const inputSchema = {
  registry_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID реестра (получить через list_container_registries)"
    ),
};

const handler = async (params: { registry_id: number }) => {
  try {
    const repos = await listContainerRegistryRepositoriesAction(
      params.registry_id
    );

    if (repos.length === 0) {
      return createToolResponse(
        `В реестре ${params.registry_id} нет репозиториев.`
      );
    }

    const lines = repos.map(
      (r) =>
        `• ${r.name}\n  тег: ${r.tags.tag}, размер: ${r.tags.size} байт\n  digest: ${r.tags.digest}`
    );

    return createToolResponse(
      `Репозитории реестра ${params.registry_id} (${repos.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения репозиториев реестра ${params.registry_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении репозиториев"
    );
  }
};

export const listContainerRegistryRepositoriesTool = {
  name: ToolNames.LIST_CONTAINER_REGISTRY_REPOSITORIES,
  title: "Список репозиториев реестра контейнеров",
  description:
    "Возвращает список репозиториев (образов) внутри конкретного реестра контейнеров: имя репозитория, тег, digest, размер. Используй чтобы посмотреть, какие образы уже загружены в реестр.",
  inputSchema,
  handler,
};
