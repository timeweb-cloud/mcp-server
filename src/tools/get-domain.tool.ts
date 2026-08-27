import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDomainAction } from "../actions/get-domain.action";

const inputSchema = {
  fqdn: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена (например: example.com)"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    const d = await getDomainAction(params.fqdn);
    return createToolResponse(`📋 Домен ${d.fqdn}:
• ID: ${d.id}
• Статус: ${d.domain_status}
• Дата окончания: ${d.expiration}
• Дней осталось: ${d.days_left ?? "—"}
• Автопродление: ${d.is_autoprolong_enabled ? "да" : "нет"}
• Premium: ${d.is_premium ? "да" : "нет"}
• Можно продлить сейчас: ${d.is_prolong_allowed ? "да" : "нет"}
• Технический: ${d.is_technical ? "да" : "нет"}
• Whois privacy: ${d.is_whois_privacy_enabled ? "включена" : "выключена"}
• Регистратор: ${d.registrar ?? "—"}
• Провайдер: ${d.provider ?? "—"}
• Поддоменов: ${d.subdomains?.length ?? 0}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении домена");
  }
};

export const getDomainTool = {
  name: ToolNames.GET_DOMAIN,
  title: "Получение информации о домене",
  description:
    "Возвращает подробную информацию о домене по его FQDN: статус, дата окончания, автопродление, whois privacy, поддомены.",
  inputSchema,
  handler,
};
