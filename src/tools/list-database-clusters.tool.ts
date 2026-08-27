import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDatabaseClustersAction } from "../actions/list-database-clusters.action";

const inputSchema = {
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - лимит записей в ответе"),
  offset: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - смещение"),
};

const handler = async (params: { limit?: number; offset?: number }) => {
  try {
    const clusters = await listDatabaseClustersAction(
      params.limit,
      params.offset
    );

    if (clusters.length === 0) {
      return createToolResponse("На аккаунте нет кластеров баз данных.");
    }

    const lines = clusters.map(
      (c) =>
        `• ID ${c.id} — ${c.name}\n  тип: ${c.type}, статус: ${c.status}, локация: ${c.location ?? "—"}, preset: ${c.preset_id}, port: ${c.port ?? "—"}`
    );

    return createToolResponse(
      `Кластеры баз данных (${clusters.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка кластеров. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении кластеров баз данных"
    );
  }
};

export const listDatabaseClustersTool = {
  name: ToolNames.LIST_DATABASE_CLUSTERS,
  title: "Список кластеров баз данных",
  description:
    "Возвращает список кластеров баз данных аккаунта (`GET /api/v1/databases`). Используй перед операциями над кластером, чтобы получить его ID.",
  inputSchema,
  handler,
};
