import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteContainerRegistryAction } from "../actions/delete-container-registry.action";

const inputSchema = {
  registry_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID реестра для удаления"),
};

const handler = async (params: { registry_id: number }) => {
  try {
    await deleteContainerRegistryAction(params.registry_id);
    return createToolResponse(
      `✅ Реестр контейнеров ${params.registry_id} удалён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить реестр ${params.registry_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении реестра");
  }
};

export const deleteContainerRegistryTool = {
  name: ToolNames.DELETE_CONTAINER_REGISTRY,
  title: "Удаление реестра контейнеров",
  description:
    "Удаляет реестр контейнеров безвозвратно. ⚠️ Все образы в реестре будут потеряны. Перед удалением убедись, что реестр не используется.",
  inputSchema,
  handler,
};
