import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateServerIpAction } from "../actions/update-server-ip.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  ip: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - IP-адрес, у которого меняется PTR"),
  ptr: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новая PTR-запись"),
};

const handler = async (params: {
  server_id: number;
  ip: string;
  ptr: string;
}) => {
  try {
    const ip = await updateServerIpAction(
      params.server_id,
      params.ip,
      params.ptr
    );
    return createToolResponse(
      `✅ PTR-запись для ${params.ip} на сервере ${params.server_id} обновлена.\n` +
        `• ${ip.type.toUpperCase()} ${ip.ip}\n` +
        `• PTR: ${ip.ptr}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить PTR для IP ${params.ip}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении PTR");
  }
};

export const updateServerIpTool = {
  name: ToolNames.UPDATE_SERVER_IP,
  title: "Изменение PTR-записи IP-адреса",
  description:
    "Меняет PTR-запись (обратное DNS) для конкретного IP-адреса сервера.",
  inputSchema,
  handler,
};
