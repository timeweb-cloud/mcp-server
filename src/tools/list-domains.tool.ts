import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDomainsAction } from "../actions/list-domains.action";

const inputSchema = {};

const handler = async () => {
  try {
    const domains = await listDomainsAction();

    if (domains.length === 0) {
      return createToolResponse("На аккаунте нет доменов.");
    }

    const lines = domains.map((d) => {
      const autoprolong = d.is_autoprolong_enabled ? "да" : "нет";
      return `• ID ${d.id} — ${d.fqdn}\n  статус: ${d.domain_status}, истекает: ${d.expiration}, дней осталось: ${d.days_left ?? "—"}\n  автопродление: ${autoprolong}, premium: ${d.is_premium ? "да" : "нет"}`;
    });

    return createToolResponse(
      `Домены (${domains.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка доменов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении доменов");
  }
};

export const listDomainsTool = {
  name: ToolNames.LIST_DOMAINS,
  title: "Список доменов",
  description:
    "Возвращает список всех доменов аккаунта с ключевыми параметрами: ID, FQDN, статус, дата окончания регистрации, автопродление. Используй перед любой операцией над доменом.",
  inputSchema,
  handler,
};
