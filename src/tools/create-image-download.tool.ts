import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createImageDownloadAction } from "../actions/create-image-download.action";

const inputSchema = {
  image_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID образа"),
  type: z
    .enum(["timeweb", "google_drive", "yandex"])
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип ссылки: timeweb (по умолчанию), google_drive, yandex"
    ),
  filename: z
    .string()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя файла для загрузки в облачное хранилище (например, 'backup.qcow2')"
    ),
  access_token: z
    .string()
    .optional()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ если type = google_drive или yandex - токен доступа к API облачного хранилища"
    ),
  refresh_token: z
    .string()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - refresh token для обновления access_token"
    ),
  expiry: z
    .string()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - время истечения access_token (ISO8601 date-time)"
    ),
  token_type: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип токена доступа (по умолчанию Bearer)"),
};

const handler = async (params: {
  image_id: string;
  type?: "timeweb" | "google_drive" | "yandex";
  filename?: string;
  access_token?: string;
  refresh_token?: string;
  expiry?: string;
  token_type?: string;
}) => {
  try {
    const needsAuth =
      params.type === "google_drive" || params.type === "yandex";
    if (needsAuth && !params.access_token) {
      return createToolResponse(
        `❌ Для типа ${params.type} необходим access_token.`
      );
    }

    const auth = params.access_token
      ? {
          access_token: params.access_token,
          refresh_token: params.refresh_token,
          expiry: params.expiry,
          token_type: params.token_type,
        }
      : undefined;

    const download = await createImageDownloadAction(params.image_id, {
      type: params.type,
      filename: params.filename,
      auth,
    });

    return createToolResponse(
      `✅ Ссылка на скачивание создана: ID ${download.id}, тип ${download.type}, статус ${download.status} (progress ${download.progress}%). Отслеживай статус через get_image_download.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать ссылку на скачивание. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании ссылки на скачивание"
    );
  }
};

export const createImageDownloadTool = {
  name: ToolNames.CREATE_IMAGE_DOWNLOAD,
  title: "Создание ссылки на скачивание образа",
  description:
    "Создаёт ссылку на скачивание образа. type=timeweb — прямая ссылка на файл (без auth). type=google_drive или yandex — копирование в облако пользователя (нужен access_token). Процесс асинхронный.",
  inputSchema,
  handler,
};
