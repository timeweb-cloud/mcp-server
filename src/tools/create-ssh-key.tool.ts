import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createSshKeyAction } from "../actions/create-ssh-key.action";

const inputSchema = {
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Название SSH-ключа"),
  body: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Тело публичного SSH-ключа (например: 'ssh-rsa AAAA... user@host')"
    ),
  is_default: z
    .boolean()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Выбирать ли этот ключ по умолчанию при создании новых серверов"
    ),
};

const handler = async (params: {
  name: string;
  body: string;
  is_default: boolean;
}) => {
  try {
    const key = await createSshKeyAction(
      params.name,
      params.body,
      params.is_default
    );

    return createToolResponse(`✅ SSH-ключ успешно создан!

📋 Детали созданного ключа:
• ID: ${key.id}
• Название: ${key.name}
• По умолчанию: ${key.is_default ? "✅ Да" : "❌ Нет"}
• Создан: ${new Date(key.created_at).toLocaleString("ru-RU")}

🎉 SSH-ключ готов к использованию!`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания SSH-ключа. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании SSH-ключа");
  }
};

export const createSshKeyTool = {
  name: ToolNames.CREATE_SSH_KEY,
  title: "Создание SSH-ключа",
  description:
    "Создаёт новый SSH-ключ в аккаунте. Требуются имя, тело публичного ключа и флаг is_default (будет ли ключ выбираться по умолчанию при создании сервера).",
  inputSchema,
  handler,
};
