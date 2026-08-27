import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { checkDomainAction } from "../actions/check-domain.action";

const inputSchema = {
  fqdn: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена для проверки доступности"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    const available = await checkDomainAction(params.fqdn);
    if (available) {
      return createToolResponse(
        `✅ Домен ${params.fqdn} свободен и доступен для регистрации.`
      );
    }
    return createToolResponse(
      `⚠️ Домен ${params.fqdn} уже занят — зарегистрировать нельзя.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка проверки домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при проверке домена");
  }
};

export const checkDomainTool = {
  name: ToolNames.CHECK_DOMAIN,
  title: "Проверка доступности домена для регистрации",
  description:
    "Проверяет, свободен ли домен и можно ли его зарегистрировать. Возвращает булево значение.",
  inputSchema,
  handler,
};
