import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addBucketToProjectAction } from "../actions/add-bucket-to-project.action";

const inputSchema = {
  project_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта, куда добавить хранилище"),
  resource_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID хранилища"),
};

const handler = async (params: {
  project_id: number;
  resource_id: number;
}) => {
  try {
    const r = await addBucketToProjectAction(
      params.project_id,
      params.resource_id
    );
    return createToolResponse(
      `✅ Хранилище ${params.resource_id} добавлено в проект ${params.project_id}.\n` +
        `• ID связи: ${r.id}, тип: ${r.type}, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить хранилище. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при добавлении хранилища");
  }
};

export const addBucketToProjectTool = {
  name: ToolNames.ADD_BUCKET_TO_PROJECT,
  title: "Добавление хранилища в проект",
  description: "Привязывает существующее S3-хранилище к проекту.",
  inputSchema,
  handler,
};
