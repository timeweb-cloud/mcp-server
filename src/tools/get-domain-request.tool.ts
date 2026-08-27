import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDomainRequestAction } from "../actions/domain-requests.action";

const inputSchema = {
  request_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID заявки"),
};

const handler = async (params: { request_id: number }) => {
  try {
    const r = await getDomainRequestAction(params.request_id);
    return createToolResponse(`📋 Заявка ID ${r.id}:
• FQDN: ${r.fqdn}
• Тип: ${r.type ?? "—"}
• Статус: ${r.status ?? "—"}
• Источник оплаты: ${r.money_source ?? "—"}
• Период: ${r.period ?? "—"}
• Дата создания: ${r.date ?? "—"}
• Автопродление: ${r.is_autoprolong_enabled ? "да" : "нет"}
• Whois privacy: ${r.is_whois_privacy_enabled ? "да" : "нет"}
• Сообщение: ${r.message ?? "—"}
• Auth code: ${r.auth_code ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения заявки ${params.request_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении заявки");
  }
};

export const getDomainRequestTool = {
  name: ToolNames.GET_DOMAIN_REQUEST,
  title: "Получение заявки на домен",
  description:
    "Возвращает детали заявки на регистрацию/продление/трансфер по её ID.",
  inputSchema,
  handler,
};
