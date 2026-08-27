import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectsAction } from "../actions/list-projects.action";

const inputSchema = {};

const handler = async () => {
  try {
    const projects = await listProjectsAction();

    if (projects.length === 0) {
      return createToolResponse("Проектов нет.");
    }

    const lines = projects.map(
      (p) =>
        `• ID ${p.id} — ${p.name}${p.is_default ? " (по умолчанию)" : ""}\n  описание: ${p.description || "—"}`
    );

    return createToolResponse(
      `Проекты (${projects.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка проектов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении проектов");
  }
};

export const listProjectsTool = {
  name: ToolNames.LIST_PROJECTS,
  title: "Список проектов",
  description:
    "Возвращает список всех проектов аккаунта с id, именем, описанием и флагом по умолчанию. Используй перед работой с ресурсами проекта, чтобы получить project_id.",
  inputSchema,
  handler,
};
