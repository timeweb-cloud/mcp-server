import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBucketsAction } from "../actions/list-buckets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const buckets = await listBucketsAction();

    if (buckets.length === 0) {
      return createToolResponse("На аккаунте нет S3-хранилищ.");
    }

    const lines = buckets.map((b) => {
      const sizeGb = b.disk_stats.is_unlimited
        ? "безлимитно"
        : `${(b.disk_stats.size / 1024 / 1024).toFixed(2)} ГБ`;
      const usedGb = `${(b.disk_stats.used / 1024 / 1024).toFixed(2)} ГБ`;
      return `• ID ${b.id} — ${b.name}\n  тип: ${b.type}, статус: ${b.status}, класс: ${b.storage_class}\n  локация: ${b.location}, hostname: ${b.hostname}\n  объектов: ${b.object_amount}, использовано: ${usedGb} / ${sizeGb}`;
    });

    return createToolResponse(
      `S3-хранилища (${buckets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка S3-хранилищ. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении S3-хранилищ"
    );
  }
};

export const listBucketsTool = {
  name: ToolNames.LIST_BUCKETS,
  title: "Список S3-хранилищ",
  description:
    "Возвращает все S3-хранилища аккаунта с id, name, type (private/public), статусом, классом (cold/hot), локацией, hostname, использованием диска. Используй перед любой операцией над хранилищем, чтобы получить его ID.",
  inputSchema,
  handler,
};
