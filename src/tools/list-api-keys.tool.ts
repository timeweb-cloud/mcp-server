import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listApiKeysAction } from "../actions/list-api-keys.action";

const inputSchema = {};

const handler = async () => {
  try {
    const keys = await listApiKeysAction();

    if (!keys || keys.length === 0) {
      return createToolResponse(
        `💡 API-токены не найдены. Создайте первый с помощью tool ${ToolNames.CREATE_API_KEY}`
      );
    }

    const lines = keys.map((k) => {
      const created = new Date(k.created_at).toLocaleString("ru-RU");
      const expires = k.expired_at
        ? new Date(k.expired_at).toLocaleString("ru-RU")
        : "без срока";
      return `• ${k.id} — ${k.name} | создан: ${created} | истекает: ${expires} | удаление сервисов: ${k.is_able_to_delete ? "✅" : "❌"}`;
    });

    return createToolResponse(
      `📋 API-токены (всего: ${keys.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при получении списка API-токенов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при получении списка API-токенов`
    );
  }
};

export const listApiKeysTool = {
  name: ToolNames.LIST_API_KEYS,
  title: "Список API-токенов",
  description:
    "Возвращает список всех выпущенных API-токенов аккаунта с их ID, именами и сроком жизни",
  inputSchema,
  handler,
};
