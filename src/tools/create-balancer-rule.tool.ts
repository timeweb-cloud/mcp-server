import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createBalancerRuleAction } from "../actions/create-balancer-rule.action";

const BalancerProtoEnum = z.enum(["http", "http2", "https", "tcp"]);

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  balancer_proto: BalancerProtoEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол балансировщика: http | http2 | https | tcp"
  ),
  balancer_port: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - порт балансировщика"),
  server_proto: BalancerProtoEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол backend-сервера"
  ),
  server_port: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - порт backend-сервера"),
};

const handler = async (params: {
  balancer_id: number;
  balancer_proto: "http" | "http2" | "https" | "tcp";
  balancer_port: number;
  server_proto: "http" | "http2" | "https" | "tcp";
  server_port: number;
}) => {
  try {
    const rule = await createBalancerRuleAction(params.balancer_id, {
      balancer_proto: params.balancer_proto,
      balancer_port: params.balancer_port,
      server_proto: params.server_proto,
      server_port: params.server_port,
    });

    return createToolResponse(`✅ Правило создано для балансировщика ${params.balancer_id}.

• ID правила: ${rule.id}
• Вход: ${rule.balancer_proto}:${rule.balancer_port}
• На backend: ${rule.server_proto}:${rule.server_port}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания правила для балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании правила балансировщика"
    );
  }
};

export const createBalancerRuleTool = {
  name: ToolNames.CREATE_BALANCER_RULE,
  title: "Создание правила балансировщика",
  description:
    "Создаёт правило маршрутизации для балансировщика: соответствие между парой (протокол, порт) балансировщика и (протокол, порт) backend-сервера.",
  inputSchema,
  handler,
};
