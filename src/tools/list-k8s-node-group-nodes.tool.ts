import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sNodeGroupNodesAction } from "../actions/list-k8s-node-group-nodes.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  group_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы нод"),
  limit: z.number().int().min(1).optional().describe("Лимит нод"),
  offset: z.number().int().min(0).optional().describe("Смещение"),
};

const handler = async (params: {
  cluster_id: number;
  group_id: number;
  limit?: number;
  offset?: number;
}) => {
  try {
    const nodes = await listK8sNodeGroupNodesAction(
      params.cluster_id,
      params.group_id,
      params.limit,
      params.offset
    );
    if (nodes.length === 0) {
      return createToolResponse(
        `В группе ${params.group_id} кластера ${params.cluster_id} нет нод.`
      );
    }
    const lines = nodes.map(
      (n) =>
        `• ID ${n.id} — тип: ${n.type}, статус: ${n.status}, IP: ${n.node_ip}, CPU: ${n.cpu}, RAM: ${n.ram}, Disk: ${n.disk}`
    );
    return createToolResponse(
      `Ноды группы ${params.group_id} (${nodes.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения нод группы. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении нод группы");
  }
};

export const listK8sNodeGroupNodesTool = {
  name: ToolNames.LIST_K8S_NODE_GROUP_NODES,
  title: "Список нод группы",
  description:
    "Возвращает список нод, принадлежащих конкретной группе кластера. Поддерживает пагинацию через limit/offset.",
  inputSchema,
  handler,
};
