import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listProjectResourcesAction } from "../actions/list-project-resources.action";

const inputSchema = {
  project_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID проекта"),
};

const handler = async (params: { project_id: number }) => {
  try {
    const res = await listProjectResourcesAction(params.project_id);

    const servers = res.servers?.length ?? 0;
    const balancers = res.balancers?.length ?? 0;
    const buckets = res.buckets?.length ?? 0;
    const clusters = res.clusters?.length ?? 0;
    const databases = res.databases?.length ?? 0;
    const dedicated = res.dedicated_servers?.length ?? 0;
    const total =
      servers + balancers + buckets + clusters + databases + dedicated;

    if (total === 0) {
      return createToolResponse(
        `В проекте ${params.project_id} нет ресурсов.`
      );
    }

    return createToolResponse(
      `📋 Ресурсы проекта ${params.project_id} (всего ${total}):\n` +
        `• Серверы: ${servers}\n` +
        `• Балансировщики: ${balancers}\n` +
        `• Хранилища: ${buckets}\n` +
        `• Кластеры k8s: ${clusters}\n` +
        `• Базы данных: ${databases}\n` +
        `• Выделенные серверы: ${dedicated}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить ресурсы проекта ${params.project_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении ресурсов");
  }
};

export const listProjectResourcesTool = {
  name: ToolNames.LIST_PROJECT_RESOURCES,
  title: "Все ресурсы проекта",
  description:
    "Возвращает сводку по всем ресурсам проекта: серверы, балансировщики, хранилища, кластеры, БД, выделенные серверы.",
  inputSchema,
  handler,
};
