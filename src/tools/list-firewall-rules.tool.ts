import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listFirewallRulesAction } from "../actions/list-firewall-rules.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
};

const handler = async (params: { group_id: string }) => {
  try {
    const rules = await listFirewallRulesAction(params.group_id);

    if (rules.length === 0) {
      return createToolResponse(
        `В группе firewall ${params.group_id} нет правил.`
      );
    }

    const lines = rules.map(
      (r) =>
        `• ID ${r.id} — ${r.direction.toUpperCase()} ${r.protocol.toUpperCase()}${r.port ? ` port ${r.port}` : ""}${r.cidr ? ` cidr ${r.cidr}` : ""}\n  описание: ${r.description || "—"}`
    );

    return createToolResponse(
      `🛡️ Правила в группе ${params.group_id} (${rules.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения правил группы firewall ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении правил firewall"
    );
  }
};

export const listFirewallRulesTool = {
  name: ToolNames.LIST_FIREWALL_RULES,
  title: "Список правил firewall в группе",
  description:
    "Возвращает список правил firewall в указанной группе: ID, направление (ingress/egress), протокол (tcp/udp/icmp), порт, CIDR, описание.",
  inputSchema,
  handler,
};
