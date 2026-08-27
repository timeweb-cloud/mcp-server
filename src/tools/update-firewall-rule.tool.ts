import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateFirewallRuleAction } from "../actions/update-firewall-rule.action";
import {
  FirewallRuleDirection,
  FirewallRuleProtocol,
} from "../types/firewall-rule.type";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  rule_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID правила"),
  direction: z
    .enum(["ingress", "egress"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - направление трафика: ingress или egress"
    ),
  protocol: z
    .enum(["tcp", "udp", "icmp"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол: tcp, udp или icmp"),
  port: z
    .string()
    .optional()
    .describe("Порт или диапазон портов (только для tcp/udp)"),
  cidr: z
    .string()
    .optional()
    .describe("Сетевой адрес или подсеть (IPv4/IPv6, CIDR)"),
  description: z
    .string()
    .optional()
    .describe("Описание правила (опц.)"),
};

const handler = async (params: {
  group_id: string;
  rule_id: string;
  direction: FirewallRuleDirection;
  protocol: FirewallRuleProtocol;
  port?: string;
  cidr?: string;
  description?: string;
}) => {
  try {
    if (params.protocol === "icmp" && params.port) {
      return createToolResponse(
        "❌ Для протокола icmp параметр port не указывается."
      );
    }

    const r = await updateFirewallRuleAction(params.group_id, params.rule_id, {
      direction: params.direction,
      protocol: params.protocol,
      port: params.port,
      cidr: params.cidr,
      description: params.description,
    });

    return createToolResponse(`✅ Правило firewall обновлено!

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
        `❌ Ошибка обновления правила ${params.rule_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении правила firewall"
    );
  }
};

export const updateFirewallRuleTool = {
  name: ToolNames.UPDATE_FIREWALL_RULE,
  title: "Обновление правила firewall",
  description:
    "Полностью обновляет правило firewall. Передаются direction, protocol (обязательно) и опциональные port, cidr, description — эти поля перезаписывают текущие значения правила.",
  inputSchema,
  handler,
};
