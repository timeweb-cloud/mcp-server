import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { unlinkFirewallResourceAction } from "../actions/unlink-firewall-resource.action";
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
    await unlinkFirewallResourceAction(
      params.group_id,
      params.resource_id,
      params.resource_type
    );

    return createToolResponse(
      `✅ Ресурс ${params.resource_id} отвязан от группы firewall ${params.group_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось отвязать ресурс ${params.resource_id} от группы ${params.group_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при отвязке ресурса от группы firewall"
    );
  }
};

export const unlinkFirewallResourceTool = {
  name: ToolNames.UNLINK_FIREWALL_RESOURCE,
  title: "Отвязка ресурса от группы firewall",
  description:
    "Отвязывает ресурс от группы правил firewall. После отвязки правила группы перестают действовать на этот ресурс.",
  inputSchema,
  handler,
};
