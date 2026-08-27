import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getMailDomainInfoAction } from "../actions/get-mail-domain-info.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
};

const handler = async (params: { domain: string }) => {
  try {
    const info = await getMailDomainInfoAction(params.domain);

    return createToolResponse(`📋 Почтовая информация о домене ${params.domain}:

• Сборный адрес для ошибочных писем: ${info.email || "—"}
• Использованное место: ${info.used} МБ`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения информации о домене. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении информации о домене"
    );
  }
};

export const getMailDomainInfoTool = {
  name: ToolNames.GET_MAIL_DOMAIN_INFO,
  title: "Почтовая информация о домене",
  description:
    "Возвращает почтовую информацию домена: адрес-сборщик для писем на несуществующие ящики и объём используемого места.",
  inputSchema,
  handler,
};
