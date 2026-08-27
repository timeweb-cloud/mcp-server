import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBalancerIpsAction } from "../actions/list-balancer-ips.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
};

const handler = async (params: { balancer_id: number }) => {
  try {
    const ips = await listBalancerIpsAction(params.balancer_id);

    if (ips.length === 0) {
      return createToolResponse(
        `Балансировщик ${params.balancer_id}: привязанных backend-IP нет.`
      );
    }

    const lines = ips.map((ip) => `• ${ip}`);
    return createToolResponse(
      `IP-адреса балансировщика ${params.balancer_id} (${ips.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения IP балансировщика ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении IP балансировщика"
    );
  }
};

export const listBalancerIpsTool = {
  name: ToolNames.LIST_BALANCER_IPS,
  title: "IP-адреса балансировщика",
  description:
    "Получает список backend IP-адресов, привязанных к балансировщику (на эти IP распределяется трафик).",
  inputSchema,
  handler,
};
