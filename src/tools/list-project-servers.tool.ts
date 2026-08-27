import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectServersAction } from "../actions/list-project-servers.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const items = await listProjectServersAction(params.project_id);
    if (items.length === 0) {
      return createToolResponse(
        `Серверов в проекте ${params.project_id} нет.`
      );
    }
    const lines = items.map(
      (s: any) =>
        `• ID ${s.id} — ${s.name ?? "без имени"}, статус: ${s.status ?? "—"}, локация: ${s.location ?? "—"}`
    );
    return createToolResponse(
      `Серверы проекта ${params.project_id} (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить серверы проекта. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении серверов");
  }
};

export const listProjectServersTool = {
  name: ToolNames.LIST_PROJECT_SERVERS,
  title: "Серверы проекта",
  description: "Список VPS-серверов в указанном проекте.",
  inputSchema,
  handler,
};
