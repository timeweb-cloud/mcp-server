import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addDatabaseToProjectAction } from "../actions/add-database-to-project.action";

const inputSchema = {
  project_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта, куда добавить БД"),
  resource_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID базы данных"),
};

const handler = async (params: {
  project_id: number;
  resource_id: number;
}) => {
  try {
    const r = await addDatabaseToProjectAction(
      params.project_id,
      params.resource_id
    );
    return createToolResponse(
      `✅ База данных ${params.resource_id} добавлена в проект ${params.project_id}.\n` +
        `• ID связи: ${r.id}, тип: ${r.type}, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить БД. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при добавлении БД");
  }
};

export const addDatabaseToProjectTool = {
  name: ToolNames.ADD_DATABASE_TO_PROJECT,
  title: "Добавление БД в проект",
  description: "Привязывает существующую managed-БД к проекту.",
  inputSchema,
  handler,
};
