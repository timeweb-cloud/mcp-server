import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getImageDownloadAction } from "../actions/get-image-download.action";

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
    const d = await getImageDownloadAction(
      params.image_id,
      params.image_url_id
    );

    const lines = [
      `📋 Ссылка на скачивание ${d.id}:`,
      `  образ: ${d.image}`,
      `  тип: ${d.type}`,
      `  статус: ${d.status} (progress ${d.progress}%)`,
      `  url: ${d.url ?? "—"}`,
      `  создана: ${d.created_at}`,
    ];

    return createToolResponse(lines.join("\n"));
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить ссылку ${params.image_url_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении ссылки");
  }
};

export const getImageDownloadTool = {
  name: ToolNames.GET_IMAGE_DOWNLOAD,
  title: "Информация о ссылке на скачивание образа",
  description:
    "Возвращает детальную информацию о конкретной ссылке на скачивание образа: тип, статус, прогресс, сам URL (если статус finished).",
  inputSchema,
  handler,
};
