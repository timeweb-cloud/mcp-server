import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateFirewallGroupAction } from "../actions/update-firewall-group.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новое имя группы"),
  description: z
    .string()
    .optional()
    .describe("Новое описание группы (опц.)"),
};

const handler = async (params: {
  group_id: string;
  name: string;
  description?: string;
}) => {
  try {
    const g = await updateFirewallGroupAction(
      params.group_id,
      params.name,
      params.description
    );

    return createToolResponse(`✅ Группа правил firewall обновлена!

📋 Детали:
• ID: ${g.id}
• Имя: ${g.name}
• Описание: ${g.description || "—"}
• Политика: ${g.policy}
• Обновлена: ${new Date(g.updated_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления группы firewall ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении группы firewall"
    );
  }
};

export const updateFirewallGroupTool = {
  name: ToolNames.UPDATE_FIREWALL_GROUP,
  title: "Обновление группы правил firewall",
  description:
    "Обновляет имя и/или описание группы правил firewall. Политика группы через этот эндпоинт не меняется.",
  inputSchema,
  handler,
};
