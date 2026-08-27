import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteSshKeyAction } from "../actions/delete-ssh-key.action";

const inputSchema = {
  ssh_key_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID SSH-ключа для удаления"),
};

const handler = async (params: { ssh_key_id: number }) => {
  try {
    await deleteSshKeyAction(params.ssh_key_id);
    return createToolResponse(
      `✅ SSH-ключ ${params.ssh_key_id} удалён из аккаунта.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить SSH-ключ ${params.ssh_key_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении SSH-ключа");
  }
};

export const deleteSshKeyTool = {
  name: ToolNames.DELETE_SSH_KEY,
  title: "Удаление SSH-ключа",
  description:
    "Удаляет SSH-ключ из аккаунта по ID. Действие необратимо. Перед удалением проверь через list_ssh_keys, что ключ не используется на критичных серверах (поле used_by).",
  inputSchema,
  handler,
};
