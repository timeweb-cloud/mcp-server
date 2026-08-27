import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateBalancerRuleAction } from "../actions/update-balancer-rule.action";

const BalancerProtoEnum = z.enum(["http", "http2", "https", "tcp"]);

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  rule_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID правила"),
  balancer_proto: BalancerProtoEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - протокол балансировщика"
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
  rule_id: number;
  balancer_proto: "http" | "http2" | "https" | "tcp";
  balancer_port: number;
  server_proto: "http" | "http2" | "https" | "tcp";
  server_port: number;
}) => {
  try {
    const rule = await updateBalancerRuleAction(
      params.balancer_id,
      params.rule_id,
      {
        balancer_proto: params.balancer_proto,
        balancer_port: params.balancer_port,
        server_proto: params.server_proto,
        server_port: params.server_port,
      }
    );

    return createToolResponse(`✅ Правило ${rule.id} обновлено (балансировщик ${params.balancer_id}).

• Вход: ${rule.balancer_proto}:${rule.balancer_port}
• На backend: ${rule.server_proto}:${rule.server_port}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления правила ${params.rule_id} балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении правила балансировщика"
    );
  }
};

export const updateBalancerRuleTool = {
  name: ToolNames.UPDATE_BALANCER_RULE,
  title: "Обновление правила балансировщика",
  description:
    "Обновляет правило маршрутизации балансировщика. Все поля (кроме id) обязательны — API ожидает полное описание правила.",
  inputSchema,
  handler,
};
