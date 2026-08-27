import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDatabaseInstanceAction } from "../actions/get-database-instance.action";

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
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID инстанса базы данных"),
};

const handler = async (params: {
  db_cluster_id: number;
  instance_id: number;
}) => {
  try {
    const i = await getDatabaseInstanceAction(
      params.db_cluster_id,
      params.instance_id
    );
    return createToolResponse(`📋 Инстанс базы данных

• ID: ${i.id}
• Название: ${i.name}
• Описание: ${i.description || "—"}
• Создан: ${new Date(i.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения инстанса ${params.instance_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении инстанса");
  }
};

export const getDatabaseInstanceTool = {
  name: ToolNames.GET_DATABASE_INSTANCE,
  title: "Получение инстанса кластера",
  description:
    "Возвращает информацию об инстансе базы данных в кластере (`GET /api/v1/databases/{db_cluster_id}/instances/{instance_id}`).",
  inputSchema,
  handler,
};
