import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { unmountServerImageAction } from "../actions/unmount-server-image.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
};

const handler = async (params: { server_id: number }) => {
  try {
    await unmountServerImageAction(params.server_id);
    return createToolResponse(
      `✅ ISO-образ сервера ${params.server_id} отмонтирован. Сервер перезагружается для продолжения штатной работы.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось отмонтировать ISO сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при отмонтировании ISO"
    );
  }
};

export const unmountServerImageTool = {
  name: ToolNames.UNMOUNT_SERVER_IMAGE,
  title: "Отмонтирование ISO-образа сервера",
  description:
    "Отмонтирует примонтированный ISO-образ и перезагружает сервер в штатном режиме.",
  inputSchema,
  handler,
};
