import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { unbindFloatingIpAction } from "../actions/unbind-floating-ip.action";

const inputSchema = {
  floating_ip_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID плавающего IP"),
};

const handler = async (params: { floating_ip_id: string }) => {
  try {
    await unbindFloatingIpAction(params.floating_ip_id);
    return createToolResponse(
      `✅ Плавающий IP ${params.floating_ip_id} отвязан от сервиса.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при отвязке плавающего IP. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при отвязке плавающего IP`
    );
  }
};

export const unbindFloatingIpTool = {
  name: ToolNames.UNBIND_FLOATING_IP,
  title: "Отвязка плавающего IP от сервиса",
  description: "Отвязывает плавающий IP от текущего сервиса",
  inputSchema,
  handler,
};
