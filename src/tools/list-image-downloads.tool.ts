import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listImageDownloadsAction } from "../actions/list-image-downloads.action";

const inputSchema = {
  image_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID образа"),
  limit: z
    .number()
    .int()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - лимит количества ссылок (по умолчанию 100)"
    ),
  offset: z
    .number()
    .int()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - смещение для пагинации (по умолчанию 0)"
    ),
};

const handler = async (params: {
  image_id: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    const downloads = await listImageDownloadsAction(
      params.image_id,
      params.limit,
      params.offset
    );

    if (downloads.length === 0) {
      return createToolResponse(
        `У образа ${params.image_id} нет ссылок на скачивание.`
      );
    }

    const lines = downloads.map(
      (d) =>
        `• ID ${d.id} — тип: ${d.type}, статус: ${d.status} (progress ${d.progress}%)\n  создана: ${d.created_at}\n  url: ${d.url ?? "—"}`
    );

    return createToolResponse(
      `Ссылки на скачивание образа ${params.image_id} (${downloads.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить ссылки на скачивание. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении ссылок на скачивание"
    );
  }
};

export const listImageDownloadsTool = {
  name: ToolNames.LIST_IMAGE_DOWNLOADS,
  title: "Список ссылок на скачивание образа",
  description:
    "Возвращает список всех ссылок на скачивание конкретного образа. Используется при миграции образа во внешние хранилища (Timeweb, Google Drive, Яндекс.Диск).",
  inputSchema,
  handler,
};
