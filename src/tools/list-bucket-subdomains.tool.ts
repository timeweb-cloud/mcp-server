import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBucketSubdomainsAction } from "../actions/list-bucket-subdomains.action";

const inputSchema = {
  bucket_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID S3-хранилища"),
};

const handler = async (params: { bucket_id: number }) => {
  try {
    const subdomains = await listBucketSubdomainsAction(params.bucket_id);

    if (subdomains.length === 0) {
      return createToolResponse(
        `У хранилища ${params.bucket_id} нет поддоменов.`
      );
    }

    const lines = subdomains.map(
      (s) =>
        `• ID ${s.id} — ${s.subdomain}\n  SSL статус: ${s.status}, попыток: ${s.tries}\n  Сертификат выдан: ${s.cert_released ? new Date(s.cert_released).toLocaleString("ru-RU") : "—"}`
    );

    return createToolResponse(
      `Поддомены хранилища ${params.bucket_id} (${subdomains.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения поддоменов хранилища ${params.bucket_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении поддоменов хранилища"
    );
  }
};

export const listBucketSubdomainsTool = {
  name: ToolNames.LIST_BUCKET_SUBDOMAINS,
  title: "Список поддоменов S3-хранилища",
  description:
    "Возвращает все поддомены, привязанные к S3-хранилищу: id, subdomain, статус SSL (ssl_released, ssl_not_requested, ssl_re_release_error), когда выдан сертификат, количество попыток перевыпуска.",
  inputSchema,
  handler,
};
