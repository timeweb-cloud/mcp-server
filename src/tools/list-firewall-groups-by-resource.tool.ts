import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listFirewallGroupsByResourceAction } from "../actions/list-firewall-groups-by-resource.action";
import { FirewallResourceType } from "../types/firewall-resource.type";

const inputSchema = {
  resource_type: z
    .enum(["server"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип ресурса. Сейчас поддерживается: server"),
  resource_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID ресурса (например, ID сервера)"),
};

const handler = async (params: {
  resource_type: FirewallResourceType;
  resource_id: string;
}) => {
  try {
    const groups = await listFirewallGroupsByResourceAction(
      params.resource_type,
      params.resource_id
    );

    if (groups.length === 0) {
      return createToolResponse(
        `К ресурсу ${params.resource_type} #${params.resource_id} не привязано ни одной группы firewall.`
      );
    }

    const lines = groups.map(
      (g) =>
        `• ID ${g.id} — ${g.name}\n  политика: ${g.policy}, описание: ${g.description || "—"}`
    );

    return createToolResponse(
      `🛡️ Группы firewall, привязанные к ${params.resource_type} #${params.resource_id} (${groups.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения групп firewall для ресурса ${params.resource_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении групп firewall для ресурса"
    );
  }
};

export const listFirewallGroupsByResourceTool = {
  name: ToolNames.LIST_FIREWALL_GROUPS_BY_RESOURCE,
  title: "Группы firewall для ресурса",
  description:
    "Возвращает список групп правил firewall, привязанных к конкретному ресурсу (например, серверу). Используй, чтобы узнать какие группы защищают сервер.",
  inputSchema,
  handler,
};
