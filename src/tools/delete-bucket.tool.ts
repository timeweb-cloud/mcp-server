import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteBucketAction } from "../actions/delete-bucket.action";

const inputSchema = {
  bucket_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища для удаления"),
  hash: z
    .string()
    .optional()
    .describe(
      "Hash подтверждения удаления (для аккаунтов с 2FA, получается из первого запроса удаления, опц.)"
    ),
  code: z
    .string()
    .optional()
    .describe(
      "Код 2FA для подтверждения удаления (только если включена 2FA, опц.)"
    ),
};

const handler = async (params: {
  bucket_id: number;
  hash?: string;
  code?: string;
}) => {
  try {
    const result = await deleteBucketAction(
      params.bucket_id,
      params.hash,
      params.code
    );

    if (result.hash && !params.code) {
      return createToolResponse(
        `⚠️ Для подтверждения удаления хранилища ${params.bucket_id} требуется 2FA-код.\n\nПолучен hash: ${result.hash}\n\nПовтори вызов с параметрами hash и code.`
      );
    }

    const movedMsg = result.is_moved_in_quarantine
      ? "перемещено в карантин"
      : "удалено немедленно";

    return createToolResponse(
      `✅ S3-хранилище ${params.bucket_id} ${movedMsg}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить S3-хранилище ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении S3-хранилища"
    );
  }
};

export const deleteBucketTool = {
  name: ToolNames.DELETE_BUCKET,
  title: "Удаление S3-хранилища",
  description:
    "Удаляет S3-хранилище. Действие необратимо. Для аккаунтов с 2FA: первый вызов возвращает hash, второй вызов нужен с hash и code. Все данные в хранилище будут потеряны.",
  inputSchema,
  handler,
};
