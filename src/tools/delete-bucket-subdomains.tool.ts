import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteBucketSubdomainsAction } from "../actions/delete-bucket-subdomains.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
  subdomains: z
    .array(z.string())
    .min(1)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив поддоменов для удаления, например ['test.example.com']"
    ),
};

const handler = async (params: {
  bucket_id: number;
  subdomains: string[];
}) => {
  try {
    const result = await deleteBucketSubdomainsAction(
      params.bucket_id,
      params.subdomains
    );

    const lines = result.map((s) => `• ${s.subdomain} — ${s.status}`);

    return createToolResponse(
      `✅ Результат удаления поддоменов из хранилища ${params.bucket_id}:\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления поддоменов из хранилища ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении поддоменов"
    );
  }
};

export const deleteBucketSubdomainsTool = {
  name: ToolNames.DELETE_BUCKET_SUBDOMAINS,
  title: "Удаление поддоменов S3-хранилища",
  description:
    "Удаляет один или несколько поддоменов из S3-хранилища. Возвращает статус удаления по каждому поддомену.",
  inputSchema,
  handler,
};
