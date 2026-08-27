import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteImageAction } from "../actions/delete-image.action";

const inputSchema = {
  image_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID образа для удаления"),
};

const handler = async (params: { image_id: string }) => {
  try {
    await deleteImageAction(params.image_id);
    return createToolResponse(`✅ Образ ${params.image_id} удалён.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить образ ${params.image_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении образа");
  }
};

export const deleteImageTool = {
  name: ToolNames.DELETE_IMAGE,
  title: "Удаление образа",
  description:
    "⚠️ НЕОБРАТИМО: Удаляет образ по его ID. После удаления восстановить нельзя. Серверы, уже созданные из образа, продолжают работать — удаление влияет только на возможность создания новых серверов из этого образа.",
  inputSchema,
  handler,
};
