import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { increaseK8sNodeGroupNodesAction } from "../actions/increase-k8s-node-group-nodes.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  group_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы нод"),
  count: z
    .number()
    .int()
    .min(1)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - количество добавляемых нод"),
  labels: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .optional()
    .describe("Лейблы для добавляемых нод"),
};

const handler = async (params: {
  cluster_id: number;
  group_id: number;
  count: number;
  labels?: Array<{ key: string; value: string }>;
}) => {
  try {
    const nodes = await increaseK8sNodeGroupNodesAction(
      params.cluster_id,
      params.group_id,
      { count: params.count, labels: params.labels }
    );
    return createToolResponse(
      `✅ В группу ${params.group_id} кластера ${params.cluster_id} добавлено ${params.count} нод. Всего в ответе: ${nodes.length}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка увеличения количества нод. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при увеличении нод");
  }
};

export const increaseK8sNodeGroupNodesTool = {
  name: ToolNames.INCREASE_K8S_NODE_GROUP_NODES,
  title: "Увеличение количества нод в группе",
  description:
    "Добавляет указанное количество воркер-нод в группу. Опционально назначает лейблы новым нодам.",
  inputSchema,
  handler,
};
