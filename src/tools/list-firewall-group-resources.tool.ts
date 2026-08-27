import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listFirewallGroupResourcesAction } from "../actions/list-firewall-group-resources.action";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
};

const handler = async (params: { group_id: string }) => {
  try {
    const resources = await listFirewallGroupResourcesAction(params.group_id);

    if (resources.length === 0) {
      return createToolResponse(
        `К группе firewall ${params.group_id} не привязано ни одного ресурса.`
      );
    }

    const lines = resources.map(
      (r) => `• ${r.type} #${r.id}`
    );

    return createToolResponse(
      `🔗 Ресурсы, привязанные к группе ${params.group_id} (${resources.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения ресурсов группы firewall ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении ресурсов группы firewall"
    );
  }
};

export const listFirewallGroupResourcesTool = {
  name: ToolNames.LIST_FIREWALL_GROUP_RESOURCES,
  title: "Список ресурсов группы firewall",
  description:
    "Возвращает список ресурсов (сейчас только серверы), привязанных к указанной группе правил firewall.",
  inputSchema,
  handler,
};
