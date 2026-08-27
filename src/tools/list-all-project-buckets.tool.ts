import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listAllProjectBucketsAction } from "../actions/list-all-project-buckets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const items = await listAllProjectBucketsAction();
    if (items.length === 0) {
      return createToolResponse("На аккаунте нет хранилищ.");
    }
    const lines = items.map(
      (b: any) =>
        `• ID ${b.id} — ${b.name ?? "без имени"}, проект: ${b.project_id ?? "—"}, тип: ${b.type ?? "—"}`
    );
    return createToolResponse(
      `Все хранилища аккаунта (${items.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить хранилища. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении хранилищ");
  }
};

export const listAllProjectBucketsTool = {
  name: ToolNames.LIST_ALL_PROJECT_BUCKETS,
  title: "Все хранилища аккаунта (по проектам)",
  description:
    "Список всех S3-хранилищ аккаунта с привязкой к проекту (project_id).",
  inputSchema,
  handler,
};
