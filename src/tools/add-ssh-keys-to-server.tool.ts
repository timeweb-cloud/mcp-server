import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addSshKeysToServerAction } from "../actions/add-ssh-keys-to-server.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  ssh_key_ids: z
    .array(z.number())
    .min(1)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив ID SSH-ключей, которые нужно добавить на сервер"
    ),
};

const handler = async (params: {
  server_id: number;
  ssh_key_ids: number[];
}) => {
  try {
    if (!params.ssh_key_ids || params.ssh_key_ids.length === 0) {
      return createToolResponse(
        "❌ Нужно передать хотя бы один ID SSH-ключа."
      );
    }

    await addSshKeysToServerAction(params.server_id, params.ssh_key_ids);

    return createToolResponse(
      `✅ SSH-ключи [${params.ssh_key_ids.join(", ")}] добавлены на сервер ${params.server_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить SSH-ключи на сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при добавлении SSH-ключей на сервер"
    );
  }
};

export const addSshKeysToServerTool = {
  name: ToolNames.ADD_SSH_KEYS_TO_SERVER,
  title: "Добавление SSH-ключей на сервер",
  description:
    "Добавляет один или несколько существующих SSH-ключей на сервер по массиву ID. Получить ID ключей можно через list_ssh_keys, ID сервера — через list_servers.",
  inputSchema,
  handler,
};
