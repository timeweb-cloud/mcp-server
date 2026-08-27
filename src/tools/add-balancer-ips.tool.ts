import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addBalancerIpsAction } from "../actions/add-balancer-ips.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  ips: z
    .array(z.string())
    .min(1)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив backend IP-адресов для добавления (например ['192.168.0.1', '192.168.0.2'])"
    ),
};

const handler = async (params: { balancer_id: number; ips: string[] }) => {
  try {
    await addBalancerIpsAction(params.balancer_id, params.ips);

    return createToolResponse(
      `✅ Добавлено IP к балансировщику ${params.balancer_id} (${params.ips.length}):\n${params.ips.map((i) => `• ${i}`).join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка добавления IP к балансировщику ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при добавлении IP к балансировщику"
    );
  }
};

export const addBalancerIpsTool = {
  name: ToolNames.ADD_BALANCER_IPS,
  title: "Добавление IP к балансировщику",
  description:
    "Добавляет backend IP-адреса к балансировщику. На эти IP будет распределяться входящий трафик.",
  inputSchema,
  handler,
};
