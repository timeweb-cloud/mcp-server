import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectBalancersAction } from "../actions/list-project-balancers.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const items = await listProjectBalancersAction(params.project_id);
    if (items.length === 0) {
      return createToolResponse(
        `Балансировщиков в проекте ${params.project_id} нет.`
      );
    }
    const lines = items.map(
      (b: any) =>
        `• ID ${b.id} — ${b.name ?? "без имени"}, статус: ${b.status ?? "—"}`
    );
    return createToolResponse(
      `Балансировщики проекта ${params.project_id} (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить балансировщики. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении балансировщиков"
    );
  }
};

export const listProjectBalancersTool = {
  name: ToolNames.LIST_PROJECT_BALANCERS,
  title: "Балансировщики проекта",
  description: "Список балансировщиков в указанном проекте.",
  inputSchema,
  handler,
};
