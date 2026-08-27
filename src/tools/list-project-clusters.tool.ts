import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectClustersAction } from "../actions/list-project-clusters.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const items = await listProjectClustersAction(params.project_id);
    if (items.length === 0) {
      return createToolResponse(
        `Кластеров k8s в проекте ${params.project_id} нет.`
      );
    }
    const lines = items.map(
      (c: any) =>
        `• ID ${c.id} — ${c.name ?? "без имени"}, статус: ${c.status ?? "—"}`
    );
    return createToolResponse(
      `Kubernetes-кластеры проекта ${params.project_id} (${items.length}):\n${lines.join("\n")}`
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

export const listProjectClustersTool = {
  name: ToolNames.LIST_PROJECT_CLUSTERS,
  title: "Kubernetes-кластеры проекта",
  description: "Список k8s-кластеров в указанном проекте.",
  inputSchema,
  handler,
};
