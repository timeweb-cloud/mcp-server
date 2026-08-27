import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteImageDownloadAction } from "../actions/delete-image-download.action";

const inputSchema = {
  image_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID образа"),
  image_url_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID ссылки на скачивание"),
};

const handler = async (params: {
  image_id: string;
  image_url_id: string;
}) => {
  try {
    await deleteImageDownloadAction(params.image_id, params.image_url_id);
    return createToolResponse(
      `✅ Ссылка на скачивание ${params.image_url_id} (образ ${params.image_id}) удалена.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить ссылку ${params.image_url_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении ссылки");
  }
};

export const deleteImageDownloadTool = {
  name: ToolNames.DELETE_IMAGE_DOWNLOAD,
  title: "Удаление ссылки на скачивание образа",
  description:
    "Удаляет ссылку на скачивание образа. Используй для отмены процесса копирования образа во внешнее хранилище.",
  inputSchema,
  handler,
};
