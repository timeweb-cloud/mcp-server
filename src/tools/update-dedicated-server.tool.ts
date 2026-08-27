import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDedicatedServerAction } from "../actions/update-dedicated-server.action";

const inputSchema = {
  dedicated_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID выделенного сервера"),
  name: z
    .string()
    .max(255)
    .optional()
    .describe("Новое имя сервера (до 255 символов, уникальное)"),
  comment: z
    .string()
    .max(255)
    .optional()
    .describe("Новый комментарий к серверу (до 255 символов)"),
};

const handler = async (params: {
  dedicated_id: number;
  name?: string;
  comment?: string;
}) => {
  if (params.name === undefined && params.comment === undefined) {
    return createToolResponse(
      "❌ Нужно передать хотя бы одно поле для обновления: name или comment."
    );
  }

  try {
    const body: { name?: string; comment?: string } = {};
    if (params.name !== undefined) body.name = params.name;
    if (params.comment !== undefined) body.comment = params.comment;

    const s = await updateDedicatedServerAction(params.dedicated_id, body);
    return createToolResponse(
      `✅ Выделенный сервер ${s.id} обновлён.\n` +
        `Имя: ${s.name}\n` +
        `Комментарий: ${s.comment || "—"}\n` +
        `Статус: ${s.status}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить выделенный сервер ${params.dedicated_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении выделенного сервера"
    );
  }
};

export const updateDedicatedServerTool = {
  name: ToolNames.UPDATE_DEDICATED_SERVER,
  title: "Обновление выделенного сервера",
  description:
    "Изменяет параметры выделенного сервера: имя и/или комментарий. Оба поля опциональны, но хотя бы одно должно быть передано.",
  inputSchema,
  handler,
};
