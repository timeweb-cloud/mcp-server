import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { linkFirewallResourceAction } from "../actions/link-firewall-resource.action";
import { FirewallResourceType } from "../types/firewall-resource.type";

const inputSchema = {
  group_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID группы правил firewall"),
  resource_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID ресурса (например, ID сервера)"),
  resource_type: z
    .enum(["server"])
    .optional()
    .describe("Тип ресурса. По умолчанию: server"),
};

const handler = async (params: {
  group_id: string;
  resource_id: string;
  resource_type?: FirewallResourceType;
}) => {
  try {
    const r = await linkFirewallResourceAction(
      params.group_id,
      params.resource_id,
      params.resource_type
    );

    return createToolResponse(
      `✅ Ресурс ${r.type} #${r.id} привязан к группе firewall ${params.group_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось привязать ресурс ${params.resource_id} к группе ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при привязке ресурса к группе firewall"
    );
  }
};

export const linkFirewallResourceTool = {
  name: ToolNames.LINK_FIREWALL_RESOURCE,
  title: "Привязка ресурса к группе firewall",
  description:
    "Привязывает ресурс (сейчас только сервер) к группе правил firewall. После привязки правила группы начинают действовать на ресурс.",
  inputSchema,
  handler,
};
