import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createDatabaseAdminAction } from "../actions/create-database-admin.action";

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
  login: z
    .string()
    .min(1)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя (login) пользователя"),
  password: z
    .string()
    .min(8)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - пароль пользователя (мин. 8 символов)"),
  privileges: z
    .array(z.enum(PRIVILEGES))
    .min(1)
    .describe(
      `ОБЯЗАТЕЛЬНОЕ ПОЛЕ - список привилегий. Допустимые: ${PRIVILEGES.join(", ")}`
    ),
  host: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - хост пользователя, напр. '%'"),
  instance_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID инстанса для применения привилегий (только MySQL). Если не передано — применится ко всем инстансам"
    ),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - описание пользователя"),
};

const handler = async (params: {
  db_cluster_id: number;
  login: string;
  password: string;
  privileges: string[];
  host?: string;
  instance_id?: number;
  description?: string;
}) => {
  try {
    const { db_cluster_id, ...data } = params;
    const admin = await createDatabaseAdminAction(db_cluster_id, data);

    if (!admin) {
      return createToolResponse(
        `⚠️ Запрос на создание пользователя "${params.login}" отправлен, но API не вернул объект.`
      );
    }

    return createToolResponse(
      `✅ Пользователь ${admin.login} (ID ${admin.id}) создан в кластере ${db_cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать пользователя "${params.login}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании пользователя");
  }
};

export const createDatabaseAdminTool = {
  name: ToolNames.CREATE_DATABASE_ADMIN,
  title: "Создание пользователя кластера",
  description:
    "Создаёт пользователя в кластере базы данных (`POST /api/v1/databases/{db_cluster_id}/admins`).",
  inputSchema,
  handler,
};
