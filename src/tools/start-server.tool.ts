import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { startServerAction } from "../actions/start-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера для запуска"),
};

const handler = async (params: { server_id: number }) => {
  try {
    await startServerAction(params.server_id);
    return createToolResponse(
      `✅ Команда запуска отправлена для сервера ${params.server_id}. Статус перейдёт в turning_on → on через несколько секунд.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось запустить сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при запуске сервера");
  }
};

export const startServerTool = {
  name: ToolNames.START_SERVER,
  title: "Запуск сервера",
  description:
    "Запускает выключенный VPS. Идемпотентен: на уже работающем сервере вернёт ошибку. Проверь статус через get_server перед вызовом.",
  inputSchema,
  handler,
};
