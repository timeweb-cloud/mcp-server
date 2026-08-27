import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { bindFloatingIpAction } from "../actions/bind-floating-ip.action";
import { FloatingIpResourceType } from "../types/floating-ip.type";

const RESOURCE_TYPES: FloatingIpResourceType[] = [
  "server",
  "balancer",
  "database",
  "network",
];

const inputSchema = {
  floating_ip_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID плавающего IP"),
  resource_type: z
    .enum(["server", "balancer", "database", "network"] as const)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип ресурса: server | balancer | database | network"
    ),
  resource_id: z
    .union([z.string(), z.number()])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID ресурса (число или строка)"),
};

const handler = async (params: {
  floating_ip_id: string;
  resource_type: FloatingIpResourceType;
  resource_id: string | number;
}) => {
  try {
    if (!RESOURCE_TYPES.includes(params.resource_type)) {
      return createToolResponse(
        `❌ Неверный resource_type: ${params.resource_type}. Допустимо: ${RESOURCE_TYPES.join(", ")}`
      );
    }

    await bindFloatingIpAction(params.floating_ip_id, {
      resource_type: params.resource_type,
      resource_id: params.resource_id,
    });

    return createToolResponse(
      `✅ Плавающий IP ${params.floating_ip_id} привязан к ${params.resource_type} #${params.resource_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при привязке плавающего IP. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при привязке плавающего IP`
    );
  }
};

export const bindFloatingIpTool = {
  name: ToolNames.BIND_FLOATING_IP,
  title: "Привязка плавающего IP к сервису",
  description:
    "Привязывает плавающий IP к сервису (server / balancer / database / network) по ID ресурса",
  inputSchema,
  handler,
};
