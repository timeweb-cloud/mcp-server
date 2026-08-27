import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getBucketAction } from "../actions/get-bucket.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
};

const handler = async (params: { bucket_id: number }) => {
  try {
    const b = await getBucketAction(params.bucket_id);

    const sizeGb = b.disk_stats.is_unlimited
      ? "безлимитно"
      : `${(b.disk_stats.size / 1024 / 1024).toFixed(2)} ГБ`;
    const usedGb = `${(b.disk_stats.used / 1024 / 1024).toFixed(2)} ГБ`;

    return createToolResponse(`📋 S3-хранилище:
• ID: ${b.id}
• Название: ${b.name}
• Описание: ${b.description || "—"}
• Тип: ${b.type}
• Статус: ${b.status}
• Класс хранилища: ${b.storage_class}
• Локация: ${b.location}
• Hostname: ${b.hostname}
• Access key: ${b.access_key}
• Secret key: ${b.secret_key}
• Объектов: ${b.object_amount}
• Диск: ${usedGb} / ${sizeGb}
• Preset ID: ${b.preset_id ?? "—"}
• Configurator ID: ${b.configurator_id ?? "—"}
• Project ID: ${b.project_id}
• Авто-апгрейд: ${b.is_allow_auto_upgrade ? "вкл." : "выкл."}
• В карантине с: ${b.moved_in_quarantine_at ? new Date(b.moved_in_quarantine_at).toLocaleString("ru-RU") : "—"}
• Website config: ${b.website_config?.enabled ? "включён" : "выключен"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения S3-хранилища ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении S3-хранилища"
    );
  }
};

export const getBucketTool = {
  name: ToolNames.GET_BUCKET,
  title: "Получение S3-хранилища",
  description:
    "Возвращает детальную информацию об одном S3-хранилище по его ID: название, тип, статус, класс, локация, hostname, ключи доступа, использование диска, настройки веб-сайта.",
  inputSchema,
  handler,
};
