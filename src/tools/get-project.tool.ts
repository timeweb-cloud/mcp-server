import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getProjectAction } from "../actions/get-project.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const p = await getProjectAction(params.project_id);

    return createToolResponse(
      `📋 Проект ID ${p.id}:\n` +
        `• Имя: ${p.name}\n` +
        `• Описание: ${p.description || "—"}\n` +
        `• По умолчанию: ${p.is_default ? "да" : "нет"}\n` +
        `• Аватар: ${p.avatar_id || "—"}\n` +
        `• Аккаунт: ${p.account_id}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить проект ${params.project_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении проекта");
  }
};

export const getProjectTool = {
  name: ToolNames.GET_PROJECT,
  title: "Получение проекта",
  description: "Возвращает детальную информацию о проекте по его ID.",
  inputSchema,
  handler,
};
