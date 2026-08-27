import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sClusterNodesAction } from "../actions/list-k8s-cluster-nodes.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
};

const handler = async (params: { cluster_id: number }) => {
  try {
    const nodes = await listK8sClusterNodesAction(params.cluster_id);
    if (nodes.length === 0) {
      return createToolResponse(
        `В кластере ${params.cluster_id} нет нод.`
      );
    }
    const lines = nodes.map(
      (n) =>
        `• ID ${n.id} — тип: ${n.type}, группа: ${n.group_id}, статус: ${n.status}, IP: ${n.node_ip}, CPU: ${n.cpu}, RAM: ${n.ram}, Disk: ${n.disk}`
    );
    return createToolResponse(
      `Все ноды кластера ${params.cluster_id} (${nodes.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка нод. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении списка нод"
    );
  }
};

export const listK8sClusterNodesTool = {
  name: ToolNames.LIST_K8S_CLUSTER_NODES,
  title: "Список всех нод кластера",
  description:
    "Возвращает список всех нод (мастер и воркер) в кластере с их ID, типом, группой, статусом и характеристиками.",
  inputSchema,
  handler,
};
