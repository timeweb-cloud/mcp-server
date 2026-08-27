import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { transferBucketAction } from "../actions/transfer-bucket.action";

const inputSchema = {
  access_key: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - access_key от стороннего S3-хранилища"),
  secret_key: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - secret_key от стороннего S3-хранилища"),
  location: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - регион источника, например 'ru-1'"
    ),
  is_force_path_style: z
    .boolean()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - принудительно использовать path-style URL для S3-объектов"
    ),
  endpoint: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - URL источника (например 'https://s3.test.ru')"
    ),
  bucket_name: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя хранилища источника"),
  new_bucket_name: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя хранилища-получателя в Timeweb Cloud"
    ),
};

const handler = async (params: {
  access_key: string;
  secret_key: string;
  location: string;
  is_force_path_style: boolean;
  endpoint: string;
  bucket_name: string;
  new_bucket_name: string;
}) => {
  try {
    await transferBucketAction({
      access_key: params.access_key,
      secret_key: params.secret_key,
      location: params.location,
      is_force_path_style: params.is_force_path_style,
      endpoint: params.endpoint,
      bucket_name: params.bucket_name,
      new_bucket_name: params.new_bucket_name,
    });

    return createToolResponse(
      `✅ Запущен перенос хранилища '${params.bucket_name}' (${params.endpoint}) → '${params.new_bucket_name}' в Timeweb Cloud.\n\nИспользуй get_bucket_transfer_status чтобы отслеживать прогресс.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка запуска переноса хранилища. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при запуске переноса хранилища"
    );
  }
};

export const transferBucketTool = {
  name: ToolNames.TRANSFER_BUCKET,
  title: "Перенос S3-хранилища от стороннего провайдера",
  description:
    "Запускает перенос S3-хранилища от стороннего провайдера (указывается endpoint, access_key, secret_key, имя bucket) в Timeweb Cloud под именем new_bucket_name. Мониторь прогресс через get_bucket_transfer_status.",
  inputSchema,
  handler,
};
