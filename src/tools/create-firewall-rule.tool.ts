import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createFirewallRuleAction } from "../actions/create-firewall-rule.action";
import {
  FirewallRuleDirection,
  FirewallRuleProtocol,
} from "../types/firewall-rule.type";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  direction: z
    .enum(["ingress", "egress"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - направление трафика: ingress (входящий) или egress (исходящий)"
    ),
  protocol: z
    .enum(["tcp", "udp", "icmp"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол: tcp, udp или icmp"),
  port: z
    .string()
    .optional()
    .describe(
      "Порт или диапазон портов (например: '22' или '8000-8080'). Применимо только для tcp/udp."
    ),
  cidr: z
    .string()
    .optional()
    .describe(
      "Сетевой адрес или подсеть в формате CIDR (IPv4 или IPv6, например: 2.2.2.2/32)"
    ),
  description: z
    .string()
    .optional()
    .describe("Описание правила (опц.)"),
};

const handler = async (params: {
  group_id: string;
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

    const r = await createFirewallRuleAction(params.group_id, {
      direction: params.direction,
      protocol: params.protocol,
      port: params.port,
      cidr: params.cidr,
      description: params.description,
    });

    return createToolResponse(`✅ Правило firewall создано!

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
        `❌ Ошибка создания правила firewall. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании правила firewall"
    );
  }
};

export const createFirewallRuleTool = {
  name: ToolNames.CREATE_FIREWALL_RULE,
  title: "Создание правила firewall",
  description:
    "Создаёт новое правило в группе firewall. Обязательны direction (ingress/egress) и protocol (tcp/udp/icmp). Для tcp/udp можно указать port и cidr.",
  inputSchema,
  handler,
};
