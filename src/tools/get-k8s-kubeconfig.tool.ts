import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getK8sKubeconfigAction } from "../actions/get-k8s-kubeconfig.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
};

const handler = async (params: { cluster_id: number }) => {
  try {
    const config = await getK8sKubeconfigAction(params.cluster_id);
    return createToolResponse(
      `✅ Kubeconfig кластера ${params.cluster_id}:\n\n${config}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения kubeconfig. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении kubeconfig"
    );
  }
};

export const getK8sKubeconfigTool = {
  name: ToolNames.GET_K8S_KUBECONFIG,
  title: "Kubeconfig кластера",
  description:
    "Возвращает содержимое файла kubeconfig для подключения kubectl к кластеру. Содержит секреты — не публиковать.",
  inputSchema,
  handler,
};
