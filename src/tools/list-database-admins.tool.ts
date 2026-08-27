import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDatabaseAdminsAction } from "../actions/list-database-admins.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
};

const handler = async (params: { db_cluster_id: number }) => {
  try {
    const admins = await listDatabaseAdminsAction(params.db_cluster_id);

    if (admins.length === 0) {
      return createToolResponse(
        `В кластере ${params.db_cluster_id} нет пользователей базы данных.`
      );
    }

    const lines = admins.map(
      (a) =>
        `• ID ${a.id} — ${a.login}\n  хост: ${a.host ?? "—"}, инстансов: ${a.instances?.length ?? 0}, описание: ${a.description || "—"}`
    );

    return createToolResponse(
      `Пользователи кластера ${params.db_cluster_id} (${admins.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения пользователей кластера ${params.db_cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении пользователей кластера"
    );
  }
};

export const listDatabaseAdminsTool = {
  name: ToolNames.LIST_DATABASE_ADMINS,
  title: "Список пользователей кластера базы данных",
  description:
    "Возвращает список пользователей (admins) кластера базы данных (`GET /api/v1/databases/{db_cluster_id}/admins`).",
  inputSchema,
  handler,
};
