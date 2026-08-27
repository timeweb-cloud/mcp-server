import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteBalancerRuleAction } from "../actions/delete-balancer-rule.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  rule_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID правила для удаления"),
};

const handler = async (params: { balancer_id: number; rule_id: number }) => {
  try {
    await deleteBalancerRuleAction(params.balancer_id, params.rule_id);
    return createToolResponse(
      `✅ Правило ${params.rule_id} удалено у балансировщика ${params.balancer_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить правило ${params.rule_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении правила балансировщика"
    );
  }
};

export const deleteBalancerRuleTool = {
  name: ToolNames.DELETE_BALANCER_RULE,
  title: "Удаление правила балансировщика",
  description:
    "Удаляет правило маршрутизации у балансировщика. Действие необратимо.",
  inputSchema,
  handler,
};
