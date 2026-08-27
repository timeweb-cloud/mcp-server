import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteDedicatedServerAction } from "../actions/delete-dedicated-server.action";

const inputSchema = {
  dedicated_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID выделенного сервера для удаления"),
};

const handler = async (params: { dedicated_id: number }) => {
  try {
    await deleteDedicatedServerAction(params.dedicated_id);
    return createToolResponse(
      `✅ Выделенный сервер ${params.dedicated_id} удалён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить выделенный сервер ${params.dedicated_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении выделенного сервера"
    );
  }
};

export const deleteDedicatedServerTool = {
  name: ToolNames.DELETE_DEDICATED_SERVER,
  title: "Удаление выделенного сервера",
  description:
    "Удаляет выделенный (dedicated) сервер. ⚠️ Все данные на сервере будут потеряны безвозвратно. Подтверди операцию с пользователем перед вызовом.",
  inputSchema,
  handler,
};
