import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteApiKeyAction } from "../actions/delete-api-key.action";

const inputSchema = {
  token_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID API-токена"),
};

const handler = async (params: { token_id: string }) => {
  try {
    await deleteApiKeyAction(params.token_id);
    return createToolResponse(`✅ API-токен ${params.token_id} удалён.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при удалении API-токена. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при удалении API-токена`);
  }
};

export const deleteApiKeyTool = {
  name: ToolNames.DELETE_API_KEY,
  title: "Удаление API-токена",
  description: "Удаляет API-токен по его ID",
  inputSchema,
  handler,
};
