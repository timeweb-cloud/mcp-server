import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getImageAction } from "../actions/get-image.action";

const inputSchema = {
  image_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID образа"),
};

const handler = async (params: { image_id: string }) => {
  try {
    const i = await getImageAction(params.image_id);

    const lines = [
      `📋 Образ ${i.id}:`,
      `  имя: ${i.name || "(без имени)"}`,
      `  описание: ${i.description || "—"}`,
      `  статус: ${i.status} (progress ${i.progress}%)`,
      `  ОС: ${i.os}, тип: ${i.type}, локация: ${i.location}`,
      `  размер физический: ${i.size} MB, виртуальный: ${i.virtual_size} MB`,
      `  disk_id: ${i.disk_id ?? "—"}, custom: ${i.is_custom}`,
      `  создан: ${i.created_at}`,
      `  удалён: ${i.deleted_at ?? "—"}`,
    ];

    return createToolResponse(lines.join("\n"));
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить образ ${params.image_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении образа");
  }
};

export const getImageTool = {
  name: ToolNames.GET_IMAGE,
  title: "Информация об образе",
  description:
    "Возвращает детальную информацию об образе по его ID: статус, прогресс создания, размеры, ОС, локацию, disk_id, флаг custom.",
  inputSchema,
  handler,
};
