import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getBucketPresetsAction } from "../actions/get-bucket-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await getBucketPresetsAction();

    if (presets.length === 0) {
      return createToolResponse("Тарифы S3-хранилищ не найдены.");
    }

    const lines = presets.map(
      (p) =>
        `• ID ${p.id} — ${p.description_short} (${p.storage_class})\n  диск: ${p.disk} ГБ, цена: ${p.price} руб., локация: ${p.location}\n  ${p.description}`
    );

    return createToolResponse(
      `Тарифы S3-хранилищ (${presets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов S3-хранилищ. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении тарифов S3-хранилищ"
    );
  }
};

export const getBucketPresetsTool = {
  name: ToolNames.GET_BUCKET_PRESETS,
  title: "Тарифы S3-хранилищ",
  description:
    "Возвращает список доступных тарифов для S3-хранилищ с id, размером диска, ценой, классом (cold/hot), локацией. Используй перед create_bucket, чтобы получить preset_id.",
  inputSchema,
  handler,
};
