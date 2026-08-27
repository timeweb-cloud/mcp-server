import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDatabaseClusterAction } from "../actions/get-database-cluster.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
};

const handler = async (params: { db_cluster_id: number }) => {
  try {
    const c = await getDatabaseClusterAction(params.db_cluster_id);

    if (!c) {
      return createToolResponse(
        `❌ Кластер ${params.db_cluster_id} не найден`
      );
    }

    return createToolResponse(`📋 Кластер базы данных

• ID: ${c.id}
• Название: ${c.name}
• Тип: ${c.type}
• Статус: ${c.status}
• Локация: ${c.location ?? "—"}
• Пресет: ${c.preset_id}
• Порт: ${c.port ?? "—"}
• Hash type: ${c.hash_type ?? "—"}
• Зона доступности: ${c.availability_zone ?? "—"}
• Публичный доступ: ${c.is_enabled_public_network ? "✅" : "❌"}
• Создан: ${new Date(c.created_at).toLocaleString("ru-RU")}

Полный JSON:
${JSON.stringify(c, null, 2)}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения кластера ${params.db_cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении кластера");
  }
};

export const getDatabaseClusterTool = {
  name: ToolNames.GET_DATABASE_CLUSTER,
  title: "Получение кластера базы данных",
  description:
    "Возвращает детальную информацию о конкретном кластере баз данных по его ID (`GET /api/v1/databases/{db_cluster_id}`).",
  inputSchema,
  handler,
};
