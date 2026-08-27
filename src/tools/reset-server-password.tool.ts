import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { resetServerPasswordAction } from "../actions/reset-server-password.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера, у которого сбросить пароль"),
};

const handler = async (params: { server_id: number }) => {
  try {
    await resetServerPasswordAction(params.server_id);
    return createToolResponse(
      `✅ Запрос на сброс пароля сервера ${params.server_id} отправлен.\n` +
        `Новый пароль root придёт на email, привязанный к аккаунту.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось сбросить пароль сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при сбросе пароля");
  }
};

export const resetServerPasswordTool = {
  name: ToolNames.RESET_SERVER_PASSWORD,
  title: "Сброс пароля root сервера",
  description:
    "Инициирует сброс root-пароля сервера. Новый пароль отправляется на email владельца аккаунта.",
  inputSchema,
  handler,
};
