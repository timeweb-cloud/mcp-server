import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateSshKeyAction } from "../actions/update-ssh-key.action";
import { UpdateSshKeyRequestDto } from "../types/dto/update-ssh-key-request.dto";

const inputSchema = {
  ssh_key_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID SSH-ключа"),
  name: z.string().optional().describe("Новое имя SSH-ключа (опц.)"),
  body: z
    .string()
    .optional()
    .describe("Новое тело публичного SSH-ключа (опц.)"),
  is_default: z
    .boolean()
    .optional()
    .describe(
      "Сделать ключ дефолтным при создании новых серверов (true/false, опц.)"
    ),
};

const handler = async (params: {
  ssh_key_id: number;
  name?: string;
  body?: string;
  is_default?: boolean;
}) => {
  try {
    const patch: UpdateSshKeyRequestDto = {};
    if (params.name !== undefined) patch.name = params.name;
    if (params.body !== undefined) patch.body = params.body;
    if (params.is_default !== undefined) patch.is_default = params.is_default;

    if (Object.keys(patch).length === 0) {
      return createToolResponse(
        "⚠️ Не передано ни одного поля для обновления (name, body, is_default)."
      );
    }

    const key = await updateSshKeyAction(params.ssh_key_id, patch);

    return createToolResponse(`✅ SSH-ключ ${key.id} обновлён.

📋 Текущее состояние:
• Название: ${key.name}
• По умолчанию: ${key.is_default ? "✅ Да" : "❌ Нет"}
• Создан: ${new Date(key.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления SSH-ключа ${params.ssh_key_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении SSH-ключа"
    );
  }
};

export const updateSshKeyTool = {
  name: ToolNames.UPDATE_SSH_KEY,
  title: "Изменение SSH-ключа",
  description:
    "Изменяет параметры SSH-ключа по ID. Можно обновить имя, тело ключа и/или флаг is_default. Передавай только те поля, которые нужно изменить.",
  inputSchema,
  handler,
};
