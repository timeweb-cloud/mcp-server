import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteFirewallRuleAction } from "../actions/delete-firewall-rule.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  rule_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID правила для удаления"),
};

const handler = async (params: { group_id: string; rule_id: string }) => {
  try {
    await deleteFirewallRuleAction(params.group_id, params.rule_id);
    return createToolResponse(
      `✅ Правило firewall ${params.rule_id} удалено из группы ${params.group_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить правило ${params.rule_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении правила firewall"
    );
  }
};

export const deleteFirewallRuleTool = {
  name: ToolNames.DELETE_FIREWALL_RULE,
  title: "Удаление правила firewall",
  description:
    "Удаляет правило из группы firewall. Действие необратимо.",
  inputSchema,
  handler,
};
