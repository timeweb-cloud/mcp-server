import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createFirewallGroupAction } from "../actions/create-firewall-group.action";
import { FirewallPolicy } from "../types/firewall-group.type";

const inputSchema = {
  name: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя группы правил firewall"),
  description: z
    .string()
    .optional()
    .describe("Описание группы правил (опц.)"),
  policy: z
    .enum(["ACCEPT", "DROP"])
    .optional()
    .describe(
      "Политика по умолчанию для группы: ACCEPT (пропускать) или DROP (блокировать). Передаётся как query-параметр при создании."
    ),
};

const handler = async (params: {
  name: string;
  description?: string;
  policy?: FirewallPolicy;
}) => {
  try {
    const g = await createFirewallGroupAction(
      params.name,
      params.description,
      params.policy
    );

    return createToolResponse(`✅ Группа правил firewall создана!

📋 Детали:
• ID: ${g.id}
• Имя: ${g.name}
• Описание: ${g.description || "—"}
• Политика: ${g.policy}
• Создана: ${new Date(g.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания группы firewall. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании группы firewall"
    );
  }
};

export const createFirewallGroupTool = {
  name: ToolNames.CREATE_FIREWALL_GROUP,
  title: "Создание группы правил firewall",
  description:
    "Создаёт новую группу правил firewall. Имя обязательно, описание и политика (ACCEPT/DROP) — опциональны. После создания группу можно наполнить правилами через create_firewall_rule и привязать к серверу через link_firewall_resource.",
  inputSchema,
  handler,
};
