import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteDomainAction } from "../actions/delete-domain.action";

const inputSchema = {
  fqdn: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена для удаления"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    await deleteDomainAction(params.fqdn);
    return createToolResponse(`✅ Домен ${params.fqdn} удалён с аккаунта.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении домена");
  }
};

export const deleteDomainTool = {
  name: ToolNames.DELETE_DOMAIN,
  title: "Удаление домена",
  description:
    "Удаляет домен с аккаунта по FQDN. Операция необратима — отвязывает домен от аккаунта Timeweb Cloud.",
  inputSchema,
  handler,
};
