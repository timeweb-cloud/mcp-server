import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addDedicatedToProjectAction } from "../actions/add-dedicated-to-project.action";

const inputSchema = {
  project_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта, куда добавить выделенный сервер"
    ),
  resource_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID выделенного сервера"),
};

const handler = async (params: {
  project_id: number;
  resource_id: number;
}) => {
  try {
    const r = await addDedicatedToProjectAction(
      params.project_id,
      params.resource_id
    );
    return createToolResponse(
      `✅ Выделенный сервер ${params.resource_id} добавлен в проект ${params.project_id}.\n` +
        `• ID связи: ${r.id}, тип: ${r.type}, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить выделенный сервер. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при добавлении выделенного сервера"
    );
  }
};

export const addDedicatedToProjectTool = {
  name: ToolNames.ADD_DEDICATED_TO_PROJECT,
  title: "Добавление выделенного сервера в проект",
  description: "Привязывает существующий выделенный сервер к проекту.",
  inputSchema,
  handler,
};
