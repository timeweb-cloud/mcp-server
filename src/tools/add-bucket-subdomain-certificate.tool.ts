import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addBucketSubdomainCertificateAction } from "../actions/add-bucket-subdomain-certificate.action";

const inputSchema = {
  subdomain: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - поддомен, для которого нужно выпустить SSL-сертификат"
    ),
};

const handler = async (params: { subdomain: string }) => {
  try {
    await addBucketSubdomainCertificateAction(params.subdomain);

    return createToolResponse(
      `✅ Запущен выпуск SSL-сертификата для поддомена '${params.subdomain}'.\n\nСтатус можно проверить через list_bucket_subdomains (поле status).`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка выпуска SSL-сертификата для '${params.subdomain}'. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при выпуске SSL-сертификата"
    );
  }
};

export const addBucketSubdomainCertificateTool = {
  name: ToolNames.ADD_BUCKET_SUBDOMAIN_CERTIFICATE,
  title: "Выпуск SSL-сертификата для поддомена S3-хранилища",
  description:
    "Выпускает SSL-сертификат (Let's Encrypt) для поддомена, привязанного к S3-хранилищу. Поддомен должен быть предварительно добавлен через add_bucket_subdomains и иметь корректную CNAME-запись.",
  inputSchema,
  handler,
};
