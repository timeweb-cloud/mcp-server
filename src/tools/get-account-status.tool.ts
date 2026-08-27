import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getAccountStatusAction } from "../actions/get-account-status.action";

const inputSchema = {};

const handler = async () => {
  try {
    const s = await getAccountStatusAction();
    return createToolResponse(
      `📋 Статус аккаунта:\n\n` +
        `Заблокирован: ${s.is_blocked ? "да" : "нет"}\n` +
        `Перманентно заблокирован: ${s.is_permanent_blocked ? "да" : "нет"}\n` +
        `Получать письма о счетах: ${s.is_send_bill_letters ? "да" : "нет"}\n` +
        `Последняя смена пароля: ${s.last_password_changed_at ?? "—"}` +
        (s.bonus_balance !== undefined
          ? `\nБонусный баланс: ${s.bonus_balance}`
          : "")
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить статус аккаунта. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении статуса");
  }
};

export const getAccountStatusTool = {
  name: ToolNames.GET_ACCOUNT_STATUS,
  title: "Статус аккаунта",
  description:
    "Возвращает статус блокировки аккаунта и настройки уведомлений. Используй для диагностики 'почему API не отвечает' (возможна блокировка при недостатке средств).",
  inputSchema,
  handler,
};
