import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addDomainAction } from "../actions/add-domain.action";

const inputSchema = {
  fqdn: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена, который уже зарегистрирован у другого регистратора и его нужно добавить на аккаунт"
    ),
};

const handler = async (params: { fqdn: string }) => {
  try {
    await addDomainAction(params.fqdn);
    return createToolResponse(
      `✅ Домен ${params.fqdn} добавлен на аккаунт. Управление DNS/NS теперь доступно в Timeweb Cloud.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка добавления домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при добавлении домена");
  }
};

export const addDomainTool = {
  name: ToolNames.ADD_DOMAIN,
  title: "Добавление домена на аккаунт",
  description:
    "Добавляет уже зарегистрированный в другом месте домен на аккаунт Timeweb Cloud для управления DNS и name-серверами. Не выполняет регистрацию — для регистрации используй create_domain_request.",
  inputSchema,
  handler,
};
