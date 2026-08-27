import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDatabaseInstancesAction } from "../actions/list-database-instances.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
};

const handler = async (params: { db_cluster_id: number }) => {
  try {
    const instances = await listDatabaseInstancesAction(params.db_cluster_id);

    if (instances.length === 0) {
      return createToolResponse(
        `В кластере ${params.db_cluster_id} нет инстансов баз данных.`
      );
    }

    const lines = instances.map(
      (i) =>
        `• ID ${i.id} — ${i.name}\n  описание: ${i.description || "—"}, создан: ${new Date(i.created_at).toLocaleString("ru-RU")}`
    );

    return createToolResponse(
      `Инстансы баз данных в кластере ${params.db_cluster_id} (${instances.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения инстансов кластера ${params.db_cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении инстансов кластера"
    );
  }
};

export const listDatabaseInstancesTool = {
  name: ToolNames.LIST_DATABASE_INSTANCES,
  title: "Список инстансов кластера",
  description:
    "Возвращает список инстансов (баз данных внутри кластера) (`GET /api/v1/databases/{db_cluster_id}/instances`).",
  inputSchema,
  handler,
};
