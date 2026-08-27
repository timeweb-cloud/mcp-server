import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getTldAction } from "../actions/tlds.action";

const inputSchema = {
  tld_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID доменной зоны"),
};

const handler = async (params: { tld_id: number }) => {
  try {
    const t = await getTldAction(params.tld_id);
    const periods =
      t.allowed_buy_periods && t.allowed_buy_periods.length > 0
        ? t.allowed_buy_periods
            .map((p) => `  - ${p.period}: ${p.price} руб.`)
            .join("\n")
        : "  —";
    return createToolResponse(`📋 Доменная зона .${t.name} (ID ${t.id}):
• Цена регистрации: ${t.price ?? "—"} руб.
• Цена продления: ${t.prolong_price ?? "—"} руб.
• Регистратор: ${t.registrar ?? "—"}
• Льготный период: ${t.grace_period ?? "—"} дней
• Досрочное продление: ${t.early_renew_period ?? "—"} дней
• Опубликована: ${t.is_published ? "да" : "нет"}
• Зарегистрирована: ${t.is_registered ? "да" : "нет"}
• Whois privacy управление: ${t.is_whois_privacy_enabled ? "да" : "нет"}
• Whois privacy по умолчанию: ${t.is_whois_privacy_default_enabled ? "да" : "нет"}

Доступные периоды:
${periods}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения доменной зоны ${params.tld_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении доменной зоны"
    );
  }
};

export const getTldTool = {
  name: ToolNames.GET_TLD,
  title: "Получение доменной зоны по ID",
  description:
    "Возвращает подробную информацию о доменной зоне (TLD) по её ID: цены, регистратор, льготные периоды, whois privacy.",
  inputSchema,
  handler,
};
