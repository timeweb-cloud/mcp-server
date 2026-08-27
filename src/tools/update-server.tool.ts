import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateServerAction } from "../actions/update-server.action";
import { UpdateServerRequestDto } from "../types/dto/update-server-request.dto";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  name: z.string().optional().describe("Новое имя сервера (до 255 символов)"),
  comment: z
    .string()
    .optional()
    .describe("Новый комментарий (до 255 символов)"),
  avatar_id: z.string().optional().describe("ID аватара сервера"),
  cloud_init: z.string().optional().describe("Cloud-init скрипт"),
};

const handler = async (params: {
  server_id: number;
  name?: string;
  comment?: string;
  avatar_id?: string;
  cloud_init?: string;
}) => {
  const body: UpdateServerRequestDto = {};
  if (params.name !== undefined) body.name = params.name;
  if (params.comment !== undefined) body.comment = params.comment;
  if (params.avatar_id !== undefined) body.avatar_id = params.avatar_id;
  if (params.cloud_init !== undefined) body.cloud_init = params.cloud_init;

  if (Object.keys(body).length === 0) {
    return createToolResponse(
      "❌ Нужно передать хотя бы одно поле: name, comment, avatar_id или cloud_init."
    );
  }

  try {
    const server = await updateServerAction(params.server_id, body);
    return createToolResponse(
      `✅ Сервер ${server.id} обновлён.\n` +
        `• Имя: ${server.name}\n` +
        `• Комментарий: ${server.comment ?? "—"}\n` +
        `• Статус: ${server.status}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении сервера");
  }
};

export const updateServerTool = {
  name: ToolNames.UPDATE_SERVER,
  title: "Изменение метаданных сервера",
  description:
    "Обновляет имя, комментарий, avatar_id или cloud_init у сервера. Для ресайза (preset/configurator) используй resize_server.",
  inputSchema,
  handler,
};
