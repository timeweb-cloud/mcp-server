import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addBalancerToProjectAction } from "../actions/add-balancer-to-project.action";

const inputSchema = {
  project_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта, куда добавить балансировщик"),
  resource_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID балансировщика"),
};

const handler = async (params: {
  project_id: number;
  resource_id: number;
}) => {
  try {
    const r = await addBalancerToProjectAction(
      params.project_id,
      params.resource_id
    );
    return createToolResponse(
      `✅ Балансировщик ${params.resource_id} добавлен в проект ${params.project_id}.\n` +
        `• ID связи: ${r.id}, тип: ${r.type}, создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось добавить балансировщик. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при добавлении балансировщика"
    );
  }
};

export const addBalancerToProjectTool = {
  name: ToolNames.ADD_BALANCER_TO_PROJECT,
  title: "Добавление балансировщика в проект",
  description:
    "Привязывает существующий балансировщик к проекту. Для переноса между проектами используй transfer_project_resource.",
  inputSchema,
  handler,
};
