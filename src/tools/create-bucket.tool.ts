import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createBucketAction } from "../actions/create-bucket.action";

const inputSchema = {
  name: z
    .string()
    .min(1)
    .max(255)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - название хранилища (1-255 символов)"),
  type: z
    .enum(["private", "public"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип хранилища: 'private' (приватное) или 'public' (публичное)"
    ),
  description: z
    .string()
    .min(1)
    .max(255)
    .optional()
    .describe("Комментарий к хранилищу (1-255 символов, опц.)"),
  preset_id: z
    .number()
    .optional()
    .describe(
      "ID тарифа. Нельзя передавать вместе с configurator. Список тарифов — get_bucket_presets."
    ),
  configurator_id: z
    .number()
    .optional()
    .describe(
      "ID конфигуратора хранилища. Нельзя передавать вместе с preset_id."
    ),
  configurator_disk_mb: z
    .number()
    .optional()
    .describe("Размер диска в МБ для конфигуратора (опц.)"),
  project_id: z.number().optional().describe("ID проекта (опц.)"),
};

const handler = async (params: {
  name: string;
  type: "private" | "public";
  description?: string;
  preset_id?: number;
  configurator_id?: number;
  configurator_disk_mb?: number;
  project_id?: number;
}) => {
  try {
    const hasPreset = params.preset_id !== undefined;
    const hasConfigurator =
      params.configurator_id !== undefined ||
      params.configurator_disk_mb !== undefined;

    if (hasPreset && hasConfigurator) {
      return createToolResponse(
        "❌ Нельзя передавать одновременно preset_id и конфигуратор. Выбери что-то одно."
      );
    }

    if (!hasPreset && !hasConfigurator) {
      return createToolResponse(
        "❌ Нужно передать либо preset_id, либо configurator_id + configurator_disk_mb."
      );
    }

    const body: any = {
      name: params.name,
      type: params.type,
    };
    if (params.description) body.description = params.description;
    if (params.project_id !== undefined) body.project_id = params.project_id;
    if (hasPreset) body.preset_id = params.preset_id;
    if (hasConfigurator) {
      body.configurator = {};
      if (params.configurator_id !== undefined)
        body.configurator.id = params.configurator_id;
      if (params.configurator_disk_mb !== undefined)
        body.configurator.disk = params.configurator_disk_mb;
    }

    const bucket = await createBucketAction(body);

    return createToolResponse(`✅ S3-хранилище успешно создано!

📋 Детали хранилища:
• ID: ${bucket.id}
• Название: ${bucket.name}
• Тип: ${bucket.type}
• Статус: ${bucket.status}
• Класс хранилища: ${bucket.storage_class}
• Локация: ${bucket.location}
• Hostname: ${bucket.hostname}
• Access key: ${bucket.access_key}
• Secret key: ${bucket.secret_key}
• Preset ID: ${bucket.preset_id ?? "—"}
• Configurator ID: ${bucket.configurator_id ?? "—"}
• Описание: ${bucket.description || "—"}

🎉 Хранилище готово к использованию!`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания S3-хранилища. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании S3-хранилища"
    );
  }
};

export const createBucketTool = {
  name: ToolNames.CREATE_BUCKET,
  title: "Создание S3-хранилища",
  description:
    "Создаёт новое S3-хранилище. Нужно указать name, type (private/public) и ЛИБО preset_id, ЛИБО configurator_id + configurator_disk_mb. Возвращает access_key и secret_key для подключения.",
  inputSchema,
  handler,
};
