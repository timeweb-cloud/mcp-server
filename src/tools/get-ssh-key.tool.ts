import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getSshKeyAction } from "../actions/get-ssh-key.action";

const inputSchema = {
  ssh_key_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID SSH-ключа"),
};

const handler = async (params: { ssh_key_id: number }) => {
  try {
    const key = await getSshKeyAction(params.ssh_key_id);

    const usedBy =
      key.used_by && key.used_by.length > 0
        ? key.used_by.map((s) => `${s.name} (ID ${s.id})`).join(", ")
        : "—";

    return createToolResponse(`📋 SSH-ключ ID ${key.id}:

• Название: ${key.name}
• По умолчанию: ${key.is_default ? "✅ Да" : "❌ Нет"}
• Создан: ${new Date(key.created_at).toLocaleString("ru-RU")}
• Используется на серверах: ${usedBy}
• Тело ключа: ${key.body}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения SSH-ключа ${params.ssh_key_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении SSH-ключа");
  }
};

export const getSshKeyTool = {
  name: ToolNames.GET_SSH_KEY,
  title: "Получение SSH-ключа",
  description:
    "Возвращает детальную информацию об SSH-ключе по его ID: имя, тело ключа, дата создания, is_default и список серверов, где он используется.",
  inputSchema,
  handler,
};
