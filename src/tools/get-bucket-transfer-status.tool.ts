import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getBucketTransferStatusAction } from "../actions/get-bucket-transfer-status.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
};

const handler = async (params: { bucket_id: number }) => {
  try {
    const s = await getBucketTransferStatusAction(params.bucket_id);

    const errorsBlock =
      s.errors.length > 0
        ? `\n\n⚠️ Ошибки (${s.errors.length}):\n${s.errors.map((e) => `  • попытка ${e.try}: ${e.value}`).join("\n")}`
        : "";

    return createToolResponse(`📋 Статус переноса S3-хранилища ${params.bucket_id}:
• Общий статус: ${s.status}
• Попыток: ${s.tries}
• Всего объектов: ${s.total_count} (размер: ${s.total_size} байт)
• Перенесено: ${s.uploaded_count} (размер: ${s.uploaded_size} байт)${errorsBlock}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения статуса переноса хранилища ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении статуса переноса хранилища"
    );
  }
};

export const getBucketTransferStatusTool = {
  name: ToolNames.GET_BUCKET_TRANSFER_STATUS,
  title: "Статус переноса S3-хранилища",
  description:
    "Возвращает статус переноса хранилища от стороннего S3-провайдера в Timeweb Cloud: started/suspended/failed, количество и размер объектов, перенесено, попытки, ошибки. Используй после transfer_bucket.",
  inputSchema,
  handler,
};
