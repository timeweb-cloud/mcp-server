import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createNetworkDriveAction } from "../actions/create-network-drive.action";

const inputSchema = {
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Название сетевого диска"),
  size: z
    .number()
    .int()
    .positive()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Размер сетевого диска в ГБ"),
  preset_id: z
    .number()
    .int()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID тарифа сетевого диска (получить список через list_network_drive_presets)"
    ),
  comment: z.string().optional().describe("Комментарий к диску (опц.)"),
};

const handler = async (params: {
  name: string;
  size: number;
  preset_id: number;
  comment?: string;
}) => {
  try {
    const drive = await createNetworkDriveAction({
      name: params.name,
      size: params.size,
      preset_id: params.preset_id,
      ...(params.comment !== undefined ? { comment: params.comment } : {}),
    });

    return createToolResponse(`✅ Сетевой диск успешно создан!

📋 Детали:
• ID: ${drive.id}
• Название: ${drive.name}
• Статус: ${drive.status}
• Тип: ${drive.type}
• Размер: ${drive.size} ГБ
• Зона доступности: ${drive.availability_zone}
• Локация: ${drive.location}
• Preset ID: ${drive.preset_id}
• Комментарий: ${drive.comment ?? "—"}

🎉 Диск готов к подключению (используй mount_network_drive).`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания сетевого диска. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании сетевого диска"
    );
  }
};

export const createNetworkDriveTool = {
  name: ToolNames.CREATE_NETWORK_DRIVE,
  title: "Создание сетевого диска",
  description:
    "Создаёт новый сетевой диск указанного размера с выбранным тарифом (preset_id). Перед созданием стоит получить список доступных тарифов через list_network_drive_presets.",
  inputSchema,
  handler,
};
