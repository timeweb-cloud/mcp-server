import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createDatabaseInstanceAction } from "../actions/create-database-instance.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
  name: z
    .string()
    .min(1)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - название инстанса базы данных"),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - описание инстанса"),
};

const handler = async (params: {
  db_cluster_id: number;
  name: string;
  description?: string;
}) => {
  try {
    const { db_cluster_id, ...data } = params;
    const i = await createDatabaseInstanceAction(db_cluster_id, data);
    if (!i) {
      return createToolResponse(
        `⚠️ Запрос на создание инстанса "${params.name}" отправлен, но API не вернул объект.`
      );
    }
    return createToolResponse(
      `✅ Инстанс ${i.name} (ID ${i.id}) создан в кластере ${db_cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать инстанс "${params.name}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании инстанса");
  }
};

export const createDatabaseInstanceTool = {
  name: ToolNames.CREATE_DATABASE_INSTANCE,
  title: "Создание инстанса в кластере",
  description:
    "Создаёт новый инстанс (БД) внутри кластера (`POST /api/v1/databases/{db_cluster_id}/instances`).",
  inputSchema,
  handler,
};
