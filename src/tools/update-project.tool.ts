import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateProjectAction } from "../actions/update-project.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
  name: z.string().max(255).optional().describe("Новое имя (опц.)"),
  description: z
    .string()
    .max(255)
    .optional()
    .describe("Новое описание (опц.)"),
  avatar_id: z.string().max(255).optional().describe("Новый ID аватара (опц.)"),
};

const handler = async (params: {
  project_id: number;
  name?: string;
  description?: string;
  avatar_id?: string;
}) => {
  try {
    if (
      params.name === undefined &&
      params.description === undefined &&
      params.avatar_id === undefined
    ) {
      return createToolResponse(
        "❌ Укажи хотя бы одно поле для обновления: name, description или avatar_id."
      );
    }

    const project = await updateProjectAction(params.project_id, {
      name: params.name,
      description: params.description,
      avatar_id: params.avatar_id,
    });

    return createToolResponse(
      `✅ Проект ${project.id} обновлён.\n` +
        `• Имя: ${project.name}\n` +
        `• Описание: ${project.description || "—"}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить проект ${params.project_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении проекта");
  }
};

export const updateProjectTool = {
  name: ToolNames.UPDATE_PROJECT,
  title: "Изменение проекта",
  description:
    "Обновляет имя, описание или аватар существующего проекта. Минимум одно поле.",
  inputSchema,
  handler,
};
