import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteDatabaseClusterAction } from "../actions/delete-database-cluster.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера для удаления"),
  hash: z
    .string()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - хеш для 2FA (возвращается после первого запроса для аккаунтов с 2FA)"
    ),
  code: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - код авторизации для 2FA"),
};

const handler = async (params: {
  db_cluster_id: number;
  hash?: string;
  code?: string;
}) => {
  try {
    const result = await deleteDatabaseClusterAction(
      params.db_cluster_id,
      params.hash,
      params.code
    );

    if (result?.hash && !params.code) {
      return createToolResponse(
        `⚠️ Требуется 2FA. Повторите запрос с hash="${result.hash}" и code из приложения-аутентификатора.`
      );
    }

    return createToolResponse(
      `✅ Кластер ${params.db_cluster_id} удалён (или перемещён в карантин).`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить кластер ${params.db_cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении кластера");
  }
};

export const deleteDatabaseClusterTool = {
  name: ToolNames.DELETE_DATABASE_CLUSTER,
  title: "Удаление кластера базы данных",
  description:
    "Удаляет кластер баз данных (`DELETE /api/v1/databases/{db_cluster_id}`). Для аккаунтов с 2FA в ответе вернётся hash — повторите запрос с ним и с code из аутентификатора.",
  inputSchema,
  handler,
};
