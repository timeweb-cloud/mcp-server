import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBucketUsersAction } from "../actions/list-bucket-users.action";

const inputSchema = {};

const handler = async () => {
  try {
    const users = await listBucketUsersAction();

    if (users.length === 0) {
      return createToolResponse("Пользователей S3-хранилищ нет.");
    }

    const lines = users.map(
      (u) => `• ID ${u.id} — access_key: ${u.access_key}`
    );

    return createToolResponse(
      `Пользователи S3-хранилищ (${users.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения пользователей S3-хранилищ. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении пользователей S3-хранилищ"
    );
  }
};

export const listBucketUsersTool = {
  name: ToolNames.LIST_BUCKET_USERS,
  title: "Список пользователей S3-хранилищ",
  description:
    "Возвращает всех пользователей-администраторов S3-хранилищ аккаунта: id и access_key. secret_key может быть в ответе, но на практике его безопаснее обновлять через update_bucket_user.",
  inputSchema,
  handler,
};
