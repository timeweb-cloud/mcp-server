import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDatabaseAdminAction } from "../actions/update-database-admin.action";

const PRIVILEGES = [
  "ALTER",
  "CREATE_VIEW",
  "CREATE",
  "DELETE",
  "DROP",
  "EVENT",
  "INDEX",
  "INSERT",
  "LOCK_TABLES",
  "REFERENCES",
  "SELECT",
  "SHOW_VIEW",
  "TRUNCATE",
  "UPDATE",
  "READ",
  "WRITE",
  "CONNECTION",
  "FAST",
  "readWrite",
  "ALTER_ROUTINE",
  "CREATE_ROUTINE",
  "TRANSACTION",
  "SLOW_LOG",
  "TRIGGER",
  "CREATE_TEMPORARY_TABLES",
] as const;

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
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID пользователя"),
  password: z
    .string()
    .min(8)
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новый пароль (мин. 8 символов)"),
  privileges: z
    .array(z.enum(PRIVILEGES))
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новый список привилегий"),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - описание"),
  instance_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID инстанса для применения привилегий (только MySQL)"
    ),
};

const handler = async (params: {
  db_cluster_id: number;
  admin_id: number;
  password?: string;
  privileges?: string[];
  description?: string;
  instance_id?: number;
}) => {
  try {
    const { db_cluster_id, admin_id, ...data } = params;
    if (Object.keys(data).length === 0) {
      return createToolResponse(
        "❌ Передайте хотя бы одно поле для обновления: password, privileges, description или instance_id"
      );
    }
    const a = await updateDatabaseAdminAction(db_cluster_id, admin_id, data);
    return createToolResponse(
      `✅ Пользователь ${a.login} (ID ${a.id}) в кластере ${db_cluster_id} обновлён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить пользователя ${params.admin_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении пользователя");
  }
};

export const updateDatabaseAdminTool = {
  name: ToolNames.UPDATE_DATABASE_ADMIN,
  title: "Изменение пользователя кластера",
  description:
    "Изменяет параметры пользователя кластера: пароль, привилегии, описание (`PATCH /api/v1/databases/{db_cluster_id}/admins/{admin_id}`).",
  inputSchema,
  handler,
};
