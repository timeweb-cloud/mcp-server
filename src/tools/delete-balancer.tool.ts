import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteBalancerAction } from "../actions/delete-balancer.action";

const inputSchema = {
  balancer_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
  hash: z
    .string()
    .optional()
    .describe("Hash подтверждения (для аккаунтов с 2FA)"),
  code: z
    .string()
    .optional()
    .describe("Код 2FA из приложения-аутентификатора"),
};

const handler = async (params: {
  balancer_id: number;
  hash?: string;
  code?: string;
}) => {
  try {
    const result = await deleteBalancerAction(
      params.balancer_id,
      params.hash,
      params.code
    );

    if (result && result.hash) {
      return createToolResponse(
        `⚠️ Для удаления балансировщика ${params.balancer_id} требуется подтверждение 2FA.\n\nПередай hash и code в повторный вызов:\n• hash: ${result.hash}\n• code: <код из приложения>`
      );
    }

    if (result && result.is_moved_in_quarantine) {
      return createToolResponse(
        `✅ Балансировщик ${params.balancer_id} перемещён в карантин (можно восстановить в ЛК).`
      );
    }

    return createToolResponse(
      `✅ Балансировщик ${params.balancer_id} удалён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить балансировщик ${params.balancer_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении балансировщика"
    );
  }
};

export const deleteBalancerTool = {
  name: ToolNames.DELETE_BALANCER,
  title: "Удаление балансировщика",
  description:
    "Удаляет балансировщик. Действие необратимо. Для аккаунтов с 2FA — первый вызов вернёт hash, повторный вызов с hash и code завершит удаление.",
  inputSchema,
  handler,
};
