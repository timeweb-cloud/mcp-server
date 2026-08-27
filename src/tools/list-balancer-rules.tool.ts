import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBalancerRulesAction } from "../actions/list-balancer-rules.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
};

const handler = async (params: { balancer_id: number }) => {
  try {
    const rules = await listBalancerRulesAction(params.balancer_id);

    if (rules.length === 0) {
      return createToolResponse(
        `У балансировщика ${params.balancer_id} нет правил.`
      );
    }

    const lines = rules.map(
      (r) =>
        `• ID ${r.id}: ${r.balancer_proto}:${r.balancer_port} → ${r.server_proto}:${r.server_port}`
    );

    return createToolResponse(
      `Правила балансировщика ${params.balancer_id} (${rules.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения правил балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении правил балансировщика"
    );
  }
};

export const listBalancerRulesTool = {
  name: ToolNames.LIST_BALANCER_RULES,
  title: "Правила балансировщика",
  description:
    "Возвращает список правил балансировщика — соответствий между портом балансировщика и портом backend-сервера.",
  inputSchema,
  handler,
};
