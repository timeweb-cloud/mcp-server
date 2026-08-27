import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteK8sClusterAction } from "../actions/delete-k8s-cluster.action";

const inputSchema = {
  cluster_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера для удаления"),
  hash: z
    .string()
    .optional()
    .describe(
      "Хэш, полученный при первом запросе удаления (для аккаунтов с 2FA)"
    ),
  code: z
    .string()
    .optional()
    .describe("Код подтверждения из приложения 2FA"),
};

const handler = async (params: {
  cluster_id: number;
  hash?: string;
  code?: string;
}) => {
  try {
    const result = await deleteK8sClusterAction(
      params.cluster_id,
      params.hash,
      params.code
    );

    if (result.hash && !result.is_moved_in_quarantine) {
      return createToolResponse(
        `⚠️ Требуется подтверждение 2FA. Повтори вызов с hash="${result.hash}" и code=<код из приложения 2FA>.`
      );
    }

    if (result.is_moved_in_quarantine) {
      return createToolResponse(
        `✅ Кластер ${params.cluster_id} перемещён в карантин.`
      );
    }

    return createToolResponse(
      `✅ Кластер ${params.cluster_id} удалён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления кластера ${params.cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении кластера");
  }
};

export const deleteK8sClusterTool = {
  name: ToolNames.DELETE_K8S_CLUSTER,
  title: "Удаление Kubernetes-кластера",
  description:
    "Удаляет Kubernetes-кластер. Действие необратимо. Для аккаунтов с 2FA: первый вызов возвращает hash, затем повторный вызов с hash и code подтверждает удаление.",
  inputSchema,
  handler,
};
