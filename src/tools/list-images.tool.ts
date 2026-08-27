import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listImagesAction } from "../actions/list-images.action";

const inputSchema = {
  limit: z
    .number()
    .int()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - лимит количества возвращаемых образов (по умолчанию 100)"
    ),
  offset: z
    .number()
    .int()
    .optional()
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - смещение для пагинации (по умолчанию 0)"
    ),
};

const handler = async (params: { limit?: number; offset?: number }) => {
  try {
    const images = await listImagesAction(params.limit, params.offset);

    if (images.length === 0) {
      return createToolResponse("На аккаунте нет образов.");
    }

    const lines = images.map(
      (i) =>
        `• ID ${i.id} — ${i.name || "(без имени)"}\n  статус: ${i.status} (progress ${i.progress}%), ОС: ${i.os}, локация: ${i.location}, тип: ${i.type}\n  размер: ${i.size} MB (виртуальный: ${i.virtual_size} MB), disk_id: ${i.disk_id ?? "—"}, custom: ${i.is_custom}`
    );

    return createToolResponse(
      `Образы (${images.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить список образов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении образов");
  }
};

export const listImagesTool = {
  name: ToolNames.LIST_IMAGES,
  title: "Список образов",
  description:
    "Возвращает список всех образов (custom images, snapshots) аккаунта с id, name, статусом, ОС, локацией, размером. Образы — это снимки дисков/загруженные qcow2 или iso, которые можно использовать для создания серверов.",
  inputSchema,
  handler,
};
