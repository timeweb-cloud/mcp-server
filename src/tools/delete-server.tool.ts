import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteServerAction } from "../actions/delete-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера для удаления"),
  hash: z
    .string()
    .optional()
    .describe(
      "Хеш (для аккаунтов с 2FA, выдаётся после первого DELETE-запроса)"
    ),
  code: z
    .string()
    .optional()
    .describe("Код подтверждения 2FA (передаётся вместе с hash)"),
};

const handler = async (params: {
  server_id: number;
  hash?: string;
  code?: string;
}) => {
  try {
    const result = await deleteServerAction(params.server_id, {
      hash: params.hash,
      code: params.code,
    });

    if (result?.hash) {
      return createToolResponse(
        `⚠️ Требуется подтверждение через 2FA.\n\n` +
          `Хеш: ${result.hash}\n` +
          `Повтори запрос delete_server с server_id, hash и code из email/приложения 2FA.`
      );
    }

    const quarantined = result?.is_moved_in_quarantine;
    return createToolResponse(
      `✅ Сервер ${params.server_id} ${quarantined ? "перемещён в карантин" : "удалён"}.` +
        (quarantined ? "\nЕго можно будет восстановить в течение периода карантина." : "")
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении сервера");
  }
};

export const deleteServerTool = {
  name: ToolNames.DELETE_SERVER,
  title: "Удаление сервера",
  description:
    "Удаляет сервер. Для аккаунтов с 2FA первый вызов возвращает hash — повторный вызов с hash и code завершит удаление. Удалённый сервер может быть перемещён в карантин.",
  inputSchema,
  handler,
};
