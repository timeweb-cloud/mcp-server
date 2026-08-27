import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDatabaseAdminAction } from "../actions/get-database-admin.action";

const inputSchema = {
  db_cluster_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера базы данных"),
  admin_id: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID пользователя базы данных"),
};

const handler = async (params: {
  db_cluster_id: number;
  admin_id: number;
}) => {
  try {
    const a = await getDatabaseAdminAction(
      params.db_cluster_id,
      params.admin_id
    );

    return createToolResponse(`👤 Пользователь базы данных

• ID: ${a.id}
• Login: ${a.login}
• Хост: ${a.host ?? "—"}
• Описание: ${a.description || "—"}
• Инстансы и привилегии:
${(a.instances ?? [])
  .map(
    (i) =>
      `  — instance ${i.instance_id}: ${i.privileges.join(", ") || "—"}`
  )
  .join("\n") || "  —"}
• Создан: ${new Date(a.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения пользователя ${params.admin_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении пользователя");
  }
};

export const getDatabaseAdminTool = {
  name: ToolNames.GET_DATABASE_ADMIN,
  title: "Получение пользователя кластера",
  description:
    "Возвращает информацию о пользователе кластера базы данных (`GET /api/v1/databases/{db_cluster_id}/admins/{admin_id}`).",
  inputSchema,
  handler,
};
