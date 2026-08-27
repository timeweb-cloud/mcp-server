import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sVersionsAction } from "../actions/list-k8s-versions.action";

const inputSchema = {};

const handler = async () => {
  try {
    const versions = await listK8sVersionsAction();
    if (versions.length === 0) {
      return createToolResponse("Нет доступных версий Kubernetes.");
    }
    return createToolResponse(
      `Доступные версии Kubernetes (${versions.length}):\n${versions.map((v) => `• ${v}`).join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения версий. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении версий");
  }
};

export const listK8sVersionsTool = {
  name: ToolNames.LIST_K8S_VERSIONS,
  title: "Список доступных версий Kubernetes",
  description:
    "Возвращает все доступные для создания/обновления версии Kubernetes. Используй перед create_k8s_cluster или update_k8s_cluster_version.",
  inputSchema,
  handler,
};
