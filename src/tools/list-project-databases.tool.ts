import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectDatabasesAction } from "../actions/list-project-databases.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const items = await listProjectDatabasesAction(params.project_id);
    if (items.length === 0) {
      return createToolResponse(
        `Баз данных в проекте ${params.project_id} нет.`
      );
    }
    const lines = items.map(
      (d: any) =>
        `• ID ${d.id} — ${d.name ?? "без имени"}, тип: ${d.type ?? "—"}, статус: ${d.status ?? "—"}`
    );
    return createToolResponse(
      `Базы данных проекта ${params.project_id} (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить БД проекта. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении БД");
  }
};

export const listProjectDatabasesTool = {
  name: ToolNames.LIST_PROJECT_DATABASES,
  title: "Базы данных проекта",
  description: "Список managed-БД в указанном проекте.",
  inputSchema,
  handler,
};
