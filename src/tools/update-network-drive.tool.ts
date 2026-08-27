import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateNetworkDriveAction } from "../actions/update-network-drive.action";

const inputSchema = {
  network_drive_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сетевого диска (UUID)"),
  name: z.string().optional().describe("Новое название диска (опц.)"),
  comment: z.string().optional().describe("Новый комментарий (опц.)"),
  size: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Новый размер диска в ГБ (опц.)"),
};

const handler = async (params: {
  network_drive_id: string;
  name?: string;
  comment?: string;
  size?: number;
}) => {
  try {
    if (
      params.name === undefined &&
      params.comment === undefined &&
      params.size === undefined
    ) {
      return createToolResponse(
        "❌ Нужно указать хотя бы одно из полей для изменения: name, comment, size"
      );
    }

    const body: {
      name?: string;
      comment?: string;
      size?: number;
    } = {};
    if (params.name !== undefined) body.name = params.name;
    if (params.comment !== undefined) body.comment = params.comment;
    if (params.size !== undefined) body.size = params.size;

    const drive = await updateNetworkDriveAction(
      params.network_drive_id,
      body
    );

    return createToolResponse(`✅ Сетевой диск ${drive.id} обновлён.

📋 Актуальные параметры:
• Название: ${drive.name}
• Размер: ${drive.size} ГБ
• Статус: ${drive.status}
• Комментарий: ${drive.comment ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления сетевого диска ${params.network_drive_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении сетевого диска"
    );
  }
};

export const updateNetworkDriveTool = {
  name: ToolNames.UPDATE_NETWORK_DRIVE,
  title: "Изменение сетевого диска",
  description:
    "Изменяет параметры сетевого диска (name, comment, size). Размер можно только увеличивать. Нужно указать хотя бы одно из полей.",
  inputSchema,
  handler,
};
