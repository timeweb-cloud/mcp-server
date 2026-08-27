import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDatabaseClusterAction } from "../actions/update-database-cluster.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
  name: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новое название кластера"),
  preset_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новый ID тарифа"),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - описание кластера"),
  is_enabled_public_network: z
    .boolean()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - включить/выключить публичный IP"),
};

const handler = async (params: {
  db_cluster_id: number;
  name?: string;
  preset_id?: number;
  description?: string;
  is_enabled_public_network?: boolean;
}) => {
  try {
    const { db_cluster_id, ...data } = params;
    if (Object.keys(data).length === 0) {
      return createToolResponse(
        "❌ Необходимо передать хотя бы одно поле для обновления: name, preset_id, description или is_enabled_public_network"
      );
    }
    const c = await updateDatabaseClusterAction(db_cluster_id, data);
    return createToolResponse(
      `✅ Кластер ${c.id} (${c.name}) обновлён. Статус: ${c.status}, пресет: ${c.preset_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить кластер ${params.db_cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении кластера");
  }
};

export const updateDatabaseClusterTool = {
  name: ToolNames.UPDATE_DATABASE_CLUSTER,
  title: "Изменение кластера базы данных",
  description:
    "Изменяет параметры кластера базы данных: название, тариф, описание, публичную сеть (`PATCH /api/v1/databases/{db_cluster_id}`).",
  inputSchema,
  handler,
};
