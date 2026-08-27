import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listAllProjectClustersAction } from "../actions/list-all-project-clusters.action";

const inputSchema = {};

const handler = async () => {
  try {
    const items = await listAllProjectClustersAction();
    if (items.length === 0) {
      return createToolResponse("На аккаунте нет кластеров.");
    }
    const lines = items.map(
      (c: any) =>
        `• ID ${c.id} — ${c.name ?? "без имени"}, проект: ${c.project_id ?? "—"}, статус: ${c.status ?? "—"}`
    );
    return createToolResponse(
      `Все кластеры k8s аккаунта (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить кластеры. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении кластеров");
  }
};

export const listAllProjectClustersTool = {
  name: ToolNames.LIST_ALL_PROJECT_CLUSTERS,
  title: "Все кластеры k8s аккаунта (по проектам)",
  description:
    "Список всех Kubernetes-кластеров аккаунта с привязкой к проекту.",
  inputSchema,
  handler,
};
