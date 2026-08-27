import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteK8sNodeGroupAction } from "../actions/delete-k8s-node-group.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  group_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы нод для удаления"),
};

const handler = async (params: { cluster_id: number; group_id: number }) => {
  try {
    await deleteK8sNodeGroupAction(params.cluster_id, params.group_id);
    return createToolResponse(
      `✅ Группа нод ${params.group_id} удалена из кластера ${params.cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления группы нод. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении группы нод"
    );
  }
};

export const deleteK8sNodeGroupTool = {
  name: ToolNames.DELETE_K8S_NODE_GROUP,
  title: "Удаление группы нод",
  description: "Удаляет группу нод из кластера. Все ноды группы будут удалены.",
  inputSchema,
  handler,
};
