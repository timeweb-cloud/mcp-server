import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sNodeGroupsAction } from "../actions/list-k8s-node-groups.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
};

const handler = async (params: { cluster_id: number }) => {
  try {
    const groups = await listK8sNodeGroupsAction(params.cluster_id);
    if (groups.length === 0) {
      return createToolResponse(
        `В кластере ${params.cluster_id} нет групп нод.`
      );
    }

    const lines = groups.map(
      (g) =>
        `• ID ${g.id} — ${g.name}, preset_id: ${g.preset_id}, нод: ${g.node_count}, создана: ${new Date(g.created_at).toLocaleString("ru-RU")}`
    );

    return createToolResponse(
      `Группы нод кластера ${params.cluster_id} (${groups.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения групп нод. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении групп нод"
    );
  }
};

export const listK8sNodeGroupsTool = {
  name: ToolNames.LIST_K8S_NODE_GROUPS,
  title: "Список групп нод кластера",
  description:
    "Возвращает список всех групп нод (node groups) в кластере с ID, именем, preset_id и количеством нод.",
  inputSchema,
  handler,
};
