import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateBucketUserAction } from "../actions/update-bucket-user.action";

const inputSchema = {
  user_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID пользователя S3-хранилища"),
  secret_key: z
    .string()
    .min(1)
    .max(255)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новый secret_key (1-255 символов)"),
};

const handler = async (params: { user_id: number; secret_key: string }) => {
  try {
    const user = await updateBucketUserAction(
      params.user_id,
      params.secret_key
    );

    return createToolResponse(`✅ Пароль пользователя ${user.id} обновлён.

📋 Параметры:
• ID: ${user.id}
• Access key: ${user.access_key}
• Secret key: ${user.secret_key}

⚠️ Обнови конфигурацию всех клиентов, подключающихся к хранилищу.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления пароля пользователя ${params.user_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении пароля пользователя"
    );
  }
};

export const updateBucketUserTool = {
  name: ToolNames.UPDATE_BUCKET_USER,
  title: "Изменение пароля пользователя S3-хранилища",
  description:
    "Меняет secret_key пользователя-администратора S3-хранилища. После смены пароля нужно обновить конфигурацию всех клиентов, подключающихся к хранилищу.",
  inputSchema,
  handler,
};
