import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getFirewallRuleAction } from "../actions/get-firewall-rule.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  rule_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID правила"),
};

const handler = async (params: { group_id: string; rule_id: string }) => {
  try {
    const r = await getFirewallRuleAction(params.group_id, params.rule_id);

    return createToolResponse(`🛡️ Правило firewall:

📋 Детали:
• ID: ${r.id}
• Группа: ${r.group_id}
• Направление: ${r.direction}
• Протокол: ${r.protocol}
• Порт: ${r.port || "—"}
• CIDR: ${r.cidr || "—"}
• Описание: ${r.description || "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения правила ${params.rule_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении правила firewall"
    );
  }
};

export const getFirewallRuleTool = {
  name: ToolNames.GET_FIREWALL_RULE,
  title: "Информация о правиле firewall",
  description:
    "Возвращает детали конкретного правила firewall: направление, протокол, порт, CIDR, описание, ID группы.",
  inputSchema,
  handler,
};
