import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getFirewallGroupAction } from "../actions/get-firewall-group.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
};

const handler = async (params: { group_id: string }) => {
  try {
    const g = await getFirewallGroupAction(params.group_id);

    return createToolResponse(`🛡️ Группа правил firewall:

📋 Детали:
• ID: ${g.id}
• Имя: ${g.name}
• Описание: ${g.description || "—"}
• Политика: ${g.policy}
• Создана: ${new Date(g.created_at).toLocaleString("ru-RU")}
• Обновлена: ${new Date(g.updated_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения группы firewall ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении группы firewall"
    );
  }
};

export const getFirewallGroupTool = {
  name: ToolNames.GET_FIREWALL_GROUP,
  title: "Информация о группе правил firewall",
  description:
    "Возвращает детали конкретной группы правил firewall по её ID: имя, описание, политика (ACCEPT/DROP), даты создания и обновления.",
  inputSchema,
  handler,
};
