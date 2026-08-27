import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createProjectAction } from "../actions/create-project.action";

const inputSchema = {
  name: z
    .string()
    .max(255)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя проекта (до 255 символов)"),
  description: z
    .string()
    .max(255)
    .optional()
    .describe("Описание проекта (до 255 символов, опц.)"),
  avatar_id: z
    .string()
    .max(255)
    .optional()
    .describe("ID аватара (опц.)"),
};

const handler = async (params: {
  name: string;
  description?: string;
  avatar_id?: string;
}) => {
  try {
    const project = await createProjectAction({
      name: params.name,
      description: params.description,
      avatar_id: params.avatar_id,
    });

    return createToolResponse(
      `✅ Проект создан!\n\n` +
        `📋 Детали:\n` +
        `• ID: ${project.id}\n` +
        `• Имя: ${project.name}\n` +
        `• Описание: ${project.description || "—"}\n` +
        `• По умолчанию: ${project.is_default ? "да" : "нет"}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать проект. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании проекта");
  }
};

export const createProjectTool = {
  name: ToolNames.CREATE_PROJECT,
  title: "Создание проекта",
  description:
    "Создаёт новый проект для группировки ресурсов (серверов, БД, хранилищ и т.д.).",
  inputSchema,
  handler,
};
