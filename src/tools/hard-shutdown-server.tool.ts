import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { hardShutdownServerAction } from "../actions/hard-shutdown-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера для принудительного выключения"),
};

const handler = async (params: { server_id: number }) => {
  try {
    await hardShutdownServerAction(params.server_id);
    return createToolResponse(
      `✅ Команда принудительного выключения отправлена для сервера ${params.server_id}. Эквивалент выдёргивания кабеля питания — ОС не успеет корректно завершиться.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось принудительно выключить сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка");
  }
};

export const hardShutdownServerTool = {
  name: ToolNames.HARD_SHUTDOWN_SERVER,
  title: "Принудительное выключение сервера",
  description:
    "Принудительно выключает сервер (reset power). Использовать только если мягкий shutdown_server завис или не реагирует — данные в RAM и незавершённые write-ы будут потеряны.",
  inputSchema,
  handler,
};
