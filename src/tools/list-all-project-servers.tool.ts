import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listAllProjectServersAction } from "../actions/list-all-project-servers.action";

const inputSchema = {};

const handler = async () => {
  try {
    const items = await listAllProjectServersAction();
    if (items.length === 0) {
      return createToolResponse("На аккаунте нет серверов.");
    }
    const lines = items.map(
      (s: any) =>
        `• ID ${s.id} — ${s.name ?? "без имени"}, проект: ${s.project_id ?? "—"}, статус: ${s.status ?? "—"}`
    );
    return createToolResponse(
      `Все серверы аккаунта (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить серверы. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении серверов");
  }
};

export const listAllProjectServersTool = {
  name: ToolNames.LIST_ALL_PROJECT_SERVERS,
  title: "Все серверы аккаунта (по проектам)",
  description:
    "Список всех VPS аккаунта с привязкой к проекту (project_id). В отличие от list_servers — содержит поле project_id для каждого сервера.",
  inputSchema,
  handler,
};
