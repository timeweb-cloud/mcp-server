import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateMailDomainInfoAction } from "../actions/update-mail-domain-info.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  email: z
    .string()
    .email()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - адрес-сборщик почты, приходящей на несуществующие ящики домена"
    ),
};

const handler = async (params: { domain: string; email: string }) => {
  try {
    const info = await updateMailDomainInfoAction(params.domain, params.email);
    return createToolResponse(
      `✅ Почтовая информация домена ${params.domain} обновлена. Сборщик: ${info.email}, использовано: ${info.used} МБ.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления почтовой информации. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении почтовой информации"
    );
  }
};

export const updateMailDomainInfoTool = {
  name: ToolNames.UPDATE_MAIL_DOMAIN_INFO,
  title: "Изменение почтовой информации о домене",
  description:
    "Меняет адрес-сборщик для писем, приходящих на несуществующие ящики домена.",
  inputSchema,
  handler,
};
