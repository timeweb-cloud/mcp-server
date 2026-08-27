import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createApiKeyAction } from "../actions/create-api-key.action";
import { CreateApiKeyRequestDto } from "../types/dto/create-api-key-request.dto";

const inputSchema = {
  name: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя для создаваемого API-токена"),
  expire: z
    .string()
    .optional()
    .describe(
      "Дата и время истечения токена в ISO8601 (например 2026-12-31T23:59:59Z). Если не указано — токен без срока"
    ),
  is_able_to_delete: z
    .boolean()
    .optional()
    .describe(
      "Разрешить удаление сервисов этим токеном без подтверждения через Telegram (по умолчанию — политика аккаунта)"
    ),
  projects: z
    .array(z.number())
    .optional()
    .describe(
      "Список ID проектов, к которым ограничивается токен. Пусто/не указано — доступ ко всем проектам"
    ),
};

const handler = async (params: {
  name: string;
  expire?: string;
  is_able_to_delete?: boolean;
  projects?: number[];
}) => {
  try {
    const data: CreateApiKeyRequestDto = { name: params.name };
    if (params.expire !== undefined) data.expire = params.expire;
    if (params.is_able_to_delete !== undefined)
      data.is_able_to_delete = params.is_able_to_delete;
    if (params.projects !== undefined) data.projects = params.projects;

    const apiKey = await createApiKeyAction(data);

    const created = new Date(apiKey.created_at).toLocaleString("ru-RU");
    const expires = apiKey.expired_at
      ? new Date(apiKey.expired_at).toLocaleString("ru-RU")
      : "без срока";

    return createToolResponse(`✅ API-токен создан

⚠️ ВНИМАНИЕ: значение токена показывается только один раз. Сохраните его:

Token: ${apiKey.token}

📋 Детали:
• ID: ${apiKey.id}
• Имя: ${apiKey.name}
• Создан: ${created}
• Истекает: ${expires}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при создании API-токена. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при создании API-токена`);
  }
};

export const createApiKeyTool = {
  name: ToolNames.CREATE_API_KEY,
  title: "Создание API-токена",
  description:
    "Создает новый API-токен. Значение токена возвращается один раз и должно быть сохранено",
  inputSchema,
  handler,
};
