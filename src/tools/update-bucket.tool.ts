import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateBucketAction } from "../actions/update-bucket.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
  preset_id: z
    .number()
    .optional()
    .describe("Новый ID тарифа. Нельзя вместе с configurator (опц.)"),
  configurator_id: z
    .number()
    .optional()
    .describe("ID конфигуратора хранилища. Нельзя вместе с preset_id (опц.)"),
  configurator_disk_mb: z
    .number()
    .optional()
    .describe("Новый размер диска в МБ для конфигуратора (опц.)"),
  bucket_type: z
    .enum(["private", "public"])
    .optional()
    .describe("Новый тип хранилища: private/public (опц.)"),
  description: z
    .string()
    .min(1)
    .max(255)
    .optional()
    .describe("Новый комментарий (1-255 символов, опц.)"),
};

const handler = async (params: {
  bucket_id: number;
  preset_id?: number;
  configurator_id?: number;
  configurator_disk_mb?: number;
  bucket_type?: "private" | "public";
  description?: string;
}) => {
  try {
    const hasPreset = params.preset_id !== undefined;
    const hasConfigurator =
      params.configurator_id !== undefined ||
      params.configurator_disk_mb !== undefined;

    if (hasPreset && hasConfigurator) {
      return createToolResponse(
        "❌ Нельзя передавать одновременно preset_id и конфигуратор."
      );
    }

    const body: any = {};
    if (hasPreset) body.preset_id = params.preset_id;
    if (hasConfigurator) {
      body.configurator = {};
      if (params.configurator_id !== undefined)
        body.configurator.id = params.configurator_id;
      if (params.configurator_disk_mb !== undefined)
        body.configurator.disk = params.configurator_disk_mb;
    }
    if (params.bucket_type) body.bucket_type = params.bucket_type;
    if (params.description) body.description = params.description;

    if (Object.keys(body).length === 0) {
      return createToolResponse(
        "❌ Передай хотя бы один параметр для изменения (preset_id, configurator, bucket_type, description)."
      );
    }

    const bucket = await updateBucketAction(params.bucket_id, body);

    return createToolResponse(`✅ S3-хранилище ${bucket.id} обновлено.

📋 Актуальные параметры:
• Название: ${bucket.name}
• Тип: ${bucket.type}
• Класс хранилища: ${bucket.storage_class}
• Preset ID: ${bucket.preset_id ?? "—"}
• Configurator ID: ${bucket.configurator_id ?? "—"}
• Описание: ${bucket.description || "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления S3-хранилища ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении S3-хранилища"
    );
  }
};

export const updateBucketTool = {
  name: ToolNames.UPDATE_BUCKET,
  title: "Изменение S3-хранилища",
  description:
    "Изменяет параметры S3-хранилища: preset_id ИЛИ configurator (disk, configurator_id), bucket_type (private/public), описание. Нельзя передавать одновременно preset_id и configurator.",
  inputSchema,
  handler,
};
