import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addBucketSubdomainsAction } from "../actions/add-bucket-subdomains.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
  subdomains: z
    .array(z.string())
    .min(1)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив поддоменов для добавления, например ['test.example.com']"
    ),
};

const handler = async (params: {
  bucket_id: number;
  subdomains: string[];
}) => {
  try {
    const result = await addBucketSubdomainsAction(
      params.bucket_id,
      params.subdomains
    );

    const lines = result.map((s) => `• ${s.subdomain} — ${s.status}`);

    return createToolResponse(
      `📋 Результат добавления поддоменов к хранилищу ${params.bucket_id}:\n\n${lines.join("\n")}\n\nДля выпуска SSL-сертификата используй add_bucket_subdomain_certificate.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка добавления поддоменов к хранилищу ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при добавлении поддоменов"
    );
  }
};

export const addBucketSubdomainsTool = {
  name: ToolNames.ADD_BUCKET_SUBDOMAINS,
  title: "Добавление поддоменов к S3-хранилищу",
  description:
    "Добавляет один или несколько поддоменов к S3-хранилищу. Для каждого возвращает статус: success, empty_cname (нет CNAME-записи), duplicate или failed. После добавления выпускай SSL через add_bucket_subdomain_certificate.",
  inputSchema,
  handler,
};
