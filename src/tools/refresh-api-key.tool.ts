import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { refreshApiKeyAction } from "../actions/refresh-api-key.action";
import { RefreshApiKeyRequestDto } from "../types/dto/refresh-api-key-request.dto";

const inputSchema = {
  token_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID API-токена, который нужно перевыпустить"),
  expire: z
    .string()
    .optional()
    .describe(
      "Новое время истечения токена в ISO8601 (например 2026-12-31T23:59:59Z). Если не указано — без срока"
    ),
};

const handler = async (params: { token_id: string; expire?: string }) => {
  try {
    const data: RefreshApiKeyRequestDto = {};
    if (params.expire !== undefined) data.expire = params.expire;

    const apiKey = await refreshApiKeyAction(params.token_id, data);

    const expires = apiKey.expired_at
      ? new Date(apiKey.expired_at).toLocaleString("ru-RU")
      : "без срока";

    return createToolResponse(`✅ API-токен перевыпущен

⚠️ ВНИМАНИЕ: новое значение токена показывается только один раз. Сохраните его:

Token: ${apiKey.token}

📋 Детали:
• ID: ${apiKey.id}
• Имя: ${apiKey.name}
• Истекает: ${expires}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при перевыпуске API-токена. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при перевыпуске API-токена`
    );
  }
};

export const refreshApiKeyTool = {
  name: ToolNames.REFRESH_API_KEY,
  title: "Перевыпуск API-токена",
  description:
    "Перевыпускает существующий API-токен. Возвращает новое значение токена (один раз)",
  inputSchema,
  handler,
};
