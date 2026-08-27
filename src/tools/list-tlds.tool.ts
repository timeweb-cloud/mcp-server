import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listTldsAction } from "../actions/tlds.action";

const inputSchema = {};

const handler = async () => {
  try {
    const tlds = await listTldsAction();
    if (tlds.length === 0) {
      return createToolResponse("Доменные зоны не найдены.");
    }
    const lines = tlds.map(
      (t) =>
        `• ID ${t.id} — .${t.name} — регистрация: ${t.price ?? "—"} руб., продление: ${t.prolong_price ?? "—"} руб.${t.registrar ? ` (регистратор: ${t.registrar})` : ""}`
    );
    return createToolResponse(
      `Доменные зоны (${tlds.length}):\n\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка доменных зон. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении доменных зон"
    );
  }
};

export const listTldsTool = {
  name: ToolNames.LIST_TLDS,
  title: "Список доменных зон (TLD)",
  description:
    "Возвращает список всех доступных доменных зон с ценами регистрации и продления. Используй перед созданием заявки на регистрацию.",
  inputSchema,
  handler,
};
