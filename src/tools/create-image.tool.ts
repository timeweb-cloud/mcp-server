import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createImageAction } from "../actions/create-image.action";

const inputSchema = {
  os: z
    .enum([
      "centos",
      "almalinux",
      "debian",
      "bitrix",
      "ubuntu",
      "brainycp",
      "archlinux",
      "astralinux",
      "windows",
      "custom_os",
      "other",
    ])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - операционная система образа. Для кастомного образа обычно 'other' или 'custom_os'"
    ),
  location: z
    .enum(["ru-1", "ru-2", "pl-1", "kz-1", "nl-1"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - локация, в которой будет создан образ"),
  name: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя образа"),
  description: z
    .string()
    .optional()
    .describe("НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - описание образа"),
  disk_id: z
    .number()
    .int()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID диска сервера, для которого создаётся образ (снапшот). Если указан — образ создаётся из диска, upload_url не нужен"
    ),
  upload_url: z
    .string()
    .url()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ссылка для загрузки образа (qcow2/iso). Используется для импорта стороннего образа. Не указывать вместе с disk_id"
    ),
};

const handler = async (params: {
  os: string;
  location: string;
  name?: string;
  description?: string;
  disk_id?: number;
  upload_url?: string;
}) => {
  try {
    if (params.disk_id !== undefined && params.upload_url) {
      return createToolResponse(
        "❌ Нельзя указывать одновременно disk_id и upload_url. Выбери один способ: снапшот диска (disk_id) или импорт по ссылке (upload_url)."
      );
    }

    const image = await createImageAction({
      os: params.os,
      location: params.location,
      name: params.name,
      description: params.description,
      disk_id: params.disk_id,
      upload_url: params.upload_url,
    });

    return createToolResponse(
      `✅ Образ создан: ID ${image.id}, имя "${image.name || "(без имени)"}", статус ${image.status} (progress ${image.progress}%). Процесс асинхронный — перепроверь статус через get_image.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать образ. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании образа");
  }
};

export const createImageTool = {
  name: ToolNames.CREATE_IMAGE,
  title: "Создание образа",
  description:
    "Создаёт образ: (а) снапшот существующего диска сервера (disk_id), (б) импорт qcow2/iso по upload_url, либо (в) пустой слот для последующей загрузки (без disk_id и upload_url — тогда заливай файл через HTTP). Процесс асинхронный, отслеживать через get_image.",
  inputSchema,
  handler,
};
