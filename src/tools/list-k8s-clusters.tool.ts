import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sClustersAction } from "../actions/list-k8s-clusters.action";

const inputSchema = {
  limit: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe("Максимальное количество возвращаемых кластеров"),
  offset: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe("Смещение относительно начала списка"),
};

const handler = async (params: { limit?: number; offset?: number }) => {
  try {
    const clusters = await listK8sClustersAction(params.limit, params.offset);

    if (clusters.length === 0) {
      return createToolResponse("Kubernetes-кластеров на аккаунте нет.");
    }

    const lines = clusters.map(
      (c) =>
        `• ID ${c.id} — ${c.name}\n  статус: ${c.status}, версия: ${c.k8s_version}, драйвер: ${c.network_driver}\n  зона: ${c.availability_zone ?? "—"}, ingress: ${c.ingress ? "вкл" : "выкл"}, preset_id (мастер): ${c.preset_id}\n  CPU: ${c.cpu ?? 0}, RAM: ${c.ram ?? 0} МБ, Disk: ${c.disk ?? 0} МБ`
    );

    return createToolResponse(
      `Kubernetes-кластеры (${clusters.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка кластеров. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении кластеров"
    );
  }
};

export const listK8sClustersTool = {
  name: ToolNames.LIST_K8S_CLUSTERS,
  title: "Список Kubernetes-кластеров",
  description:
    "Возвращает список всех Kubernetes-кластеров аккаунта с ID, именем, статусом, версией k8s, сетевым драйвером, зоной доступности и агрегированными CPU/RAM/Disk. Используй перед операциями над кластером, чтобы получить его ID.",
  inputSchema,
  handler,
};
