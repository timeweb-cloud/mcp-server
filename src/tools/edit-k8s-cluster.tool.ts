import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { editK8sClusterAction } from "../actions/edit-k8s-cluster.action";

const oidcSchema = z.object({
  name: z.string(),
  issuer_url: z.string(),
  client_id: z.string(),
  username_claim: z.string().optional(),
  groups_claim: z.string().optional(),
});

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  name: z.string().optional().describe("Новое имя кластера"),
  description: z.string().optional().describe("Новое описание"),
  oidc_provider: oidcSchema
    .optional()
    .describe(
      "OIDC-провайдер: name, issuer_url, client_id (+ опц. username_claim, groups_claim)"
    ),
};

const handler = async (params: {
  cluster_id: number;
  name?: string;
  description?: string;
  oidc_provider?: {
    name: string;
    issuer_url: string;
    client_id: string;
    username_claim?: string;
    groups_claim?: string;
  };
}) => {
  try {
    if (!params.name && !params.description && !params.oidc_provider) {
      return createToolResponse(
        "❌ Ничего не указано для изменения. Передай хотя бы одно: name, description или oidc_provider."
      );
    }

    const cluster = await editK8sClusterAction(params.cluster_id, {
      name: params.name,
      description: params.description,
      oidc_provider: params.oidc_provider,
    });

    return createToolResponse(
      `✅ Кластер ${cluster.id} обновлён. Название: ${cluster.name}, описание: ${cluster.description || "—"}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления кластера. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении кластера");
  }
};

export const editK8sClusterTool = {
  name: ToolNames.EDIT_K8S_CLUSTER,
  title: "Редактирование Kubernetes-кластера",
  description:
    "Редактирует имя, описание или OIDC-провайдера кластера. Другие параметры (версия, ноды) изменяются отдельными инструментами.",
  inputSchema,
  handler,
};
