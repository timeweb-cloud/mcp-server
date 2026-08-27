import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDatabaseInstanceAction } from "../actions/update-database-instance.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
  instance_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID инстанса"),
  name: z.string().optional().describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новое название"),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новое описание"),
};

const handler = async (params: {
  db_cluster_id: number;
  instance_id: number;
  name?: string;
  description?: string;
}) => {
  try {
    const { db_cluster_id, instance_id, ...data } = params;
    if (Object.keys(data).length === 0) {
      return createToolResponse(
        "❌ Передайте хотя бы одно поле для обновления: name или description"
      );
    }
    const i = await updateDatabaseInstanceAction(
      db_cluster_id,
      instance_id,
      data
    );
    return createToolResponse(
      `✅ Инстанс ${i.id} (${i.name}) в кластере ${db_cluster_id} обновлён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить инстанс ${params.instance_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении инстанса");
  }
};

export const updateDatabaseInstanceTool = {
  name: ToolNames.UPDATE_DATABASE_INSTANCE,
  title: "Изменение инстанса кластера",
  description:
    "Изменяет параметры инстанса базы данных в кластере (`PATCH /api/v1/databases/{db_cluster_id}/instances/{instance_id}`).",
  inputSchema,
  handler,
};
