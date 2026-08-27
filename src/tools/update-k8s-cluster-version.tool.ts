import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateK8sClusterVersionAction } from "../actions/update-k8s-cluster-version.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  k8s_version: z
    .string()
    .optional()
    .describe(
      "Новая версия Kubernetes (например, v1.33.4+k0s.0). Получить список через list_k8s_versions."
    ),
};

const handler = async (params: {
  cluster_id: number;
  k8s_version?: string;
}) => {
  try {
    await updateK8sClusterVersionAction(params.cluster_id, params.k8s_version);
    return createToolResponse(
      `✅ Запрос на обновление версии кластера ${params.cluster_id} отправлен${params.k8s_version ? ` (целевая версия: ${params.k8s_version})` : ""}. Проверь статус через get_k8s_cluster.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления версии кластера. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении версии");
  }
};

export const updateK8sClusterVersionTool = {
  name: ToolNames.UPDATE_K8S_CLUSTER_VERSION,
  title: "Обновление версии Kubernetes-кластера",
  description:
    "Обновляет версию Kubernetes в кластере. Версию можно не передавать — тогда будет выбрана следующая доступная.",
  inputSchema,
  handler,
};
