import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addServerToProjectAction } from "../actions/add-server-to-project.action";

const inputSchema = {
  project_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта, куда добавить сервер"),
  resource_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
};

const handler = async (params: {
  project_id: number;
  resource_id: number;
}) => {
  try {
    const r = await addServerToProjectAction(
      params.project_id,
      params.resource_id
    );
    return createToolResponse(
      `✅ Сервер ${params.resource_id} добавлен в проект ${params.project_id}.\n` +
        `• ID связи: ${r.id}, тип: ${r.type}, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить сервер. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при добавлении сервера");
  }
};

export const addServerToProjectTool = {
  name: ToolNames.ADD_SERVER_TO_PROJECT,
  title: "Добавление сервера в проект",
  description:
    "Привязывает существующий VPS-сервер к проекту. Для переноса между проектами — transfer_project_resource.",
  inputSchema,
  handler,
};
