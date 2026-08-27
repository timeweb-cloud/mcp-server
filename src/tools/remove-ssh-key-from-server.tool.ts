import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { removeSshKeyFromServerAction } from "../actions/remove-ssh-key-from-server.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  ssh_key_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID SSH-ключа, который нужно снять с сервера"),
};

const handler = async (params: { server_id: number; ssh_key_id: number }) => {
  try {
    await removeSshKeyFromServerAction(params.server_id, params.ssh_key_id);

    return createToolResponse(
      `✅ SSH-ключ ${params.ssh_key_id} снят с сервера ${params.server_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось снять SSH-ключ ${params.ssh_key_id} с сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при снятии SSH-ключа с сервера"
    );
  }
};

export const removeSshKeyFromServerTool = {
  name: ToolNames.REMOVE_SSH_KEY_FROM_SERVER,
  title: "Снятие SSH-ключа с сервера",
  description:
    "Удаляет конкретный SSH-ключ с сервера. Сам ключ в аккаунте остаётся — удаляется только привязка к серверу. Для полного удаления ключа используй delete_ssh_key.",
  inputSchema,
  handler,
};
