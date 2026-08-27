import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDomainRequestsAction } from "../actions/domain-requests.action";

const inputSchema = {};

const handler = async () => {
  try {
    const requests = await listDomainRequestsAction();
    if (requests.length === 0) {
      return createToolResponse("Заявок на регистрацию/продление/трансфер нет.");
    }
    const lines = requests.map((r) => {
      return `• ID ${r.id} — ${r.fqdn}\n  тип: ${r.type ?? "—"}, статус: ${r.status ?? "—"}, источник оплаты: ${r.money_source ?? "—"}, дата: ${r.date ?? "—"}`;
    });
    return createToolResponse(
      `Заявки на домены (${requests.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка заявок. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении заявок");
  }
};

export const listDomainRequestsTool = {
  name: ToolNames.LIST_DOMAIN_REQUESTS,
  title: "Список заявок на регистрацию/продление/трансфер доменов",
  description:
    "Возвращает все заявки пользователя на операции с доменами: регистрация, продление, трансфер. Включает ID, FQDN, тип, статус, источник оплаты.",
  inputSchema,
  handler,
};
