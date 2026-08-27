import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { cloneServerAction } from "../actions/clone-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID исходного сервера для клонирования"),
};

const handler = async (params: { server_id: number }) => {
  try {
    const server = await cloneServerAction(params.server_id);
    return createToolResponse(
      `✅ Сервер ${params.server_id} клонирован.\n\n` +
        `Новый сервер: ID ${server.id}, имя "${server.name}", статус ${server.status}.\n` +
        `Локация: ${server.location}, CPU: ${server.cpu}, RAM: ${server.ram} MB.\n` +
        `Создание идёт асинхронно — повторно проверь статус через get_server.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось клонировать сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при клонировании");
  }
};

export const cloneServerTool = {
  name: ToolNames.CLONE_SERVER,
  title: "Клонирование сервера",
  description:
    "Создаёт полную копию сервера в отдельный VPS с такой же конфигурацией и данными. Использовать для миграций, blue-green deploy или тестирования рискованных операций на копии.",
  inputSchema,
  handler,
};
