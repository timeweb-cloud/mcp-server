import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getK8sNodeGroupAction } from "../actions/get-k8s-node-group.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  group_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы нод"),
};

const handler = async (params: { cluster_id: number; group_id: number }) => {
  try {
    const g = await getK8sNodeGroupAction(params.cluster_id, params.group_id);
    return createToolResponse(`📋 Группа нод ID ${g.id}
• Название: ${g.name}
• Preset (мастер): ${g.preset_id}
• Количество нод: ${g.node_count}
• Создана: ${new Date(g.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения группы нод. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении группы нод"
    );
  }
};

export const getK8sNodeGroupTool = {
  name: ToolNames.GET_K8S_NODE_GROUP,
  title: "Информация о группе нод",
  description: "Возвращает детальную информацию о группе нод кластера по её ID.",
  inputSchema,
  handler,
};
