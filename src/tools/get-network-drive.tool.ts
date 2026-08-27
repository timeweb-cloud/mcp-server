import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getNetworkDriveAction } from "../actions/get-network-drive.action";

const inputSchema = {
  network_drive_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сетевого диска (UUID)"),
};

const handler = async (params: { network_drive_id: string }) => {
  try {
    const drive = await getNetworkDriveAction(params.network_drive_id);

    const services =
      drive.service_list && drive.service_list.length > 0
        ? drive.service_list
            .map((s) => `${s.resource_type}#${s.resource_id}`)
            .join(", ")
        : "не подключён";

    return createToolResponse(`📋 Сетевой диск ${drive.id}:

• Название: ${drive.name}
• Статус: ${drive.status}
• Тип: ${drive.type}
• Размер: ${drive.size} ГБ
• Зона доступности: ${drive.availability_zone}
• Локация: ${drive.location}
• Preset ID: ${drive.preset_id}
• Подключения: ${services}
• Комментарий: ${drive.comment ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения сетевого диска ${params.network_drive_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении сетевого диска"
    );
  }
};

export const getNetworkDriveTool = {
  name: ToolNames.GET_NETWORK_DRIVE,
  title: "Получение сетевого диска",
  description:
    "Возвращает детальную информацию о конкретном сетевом диске по его ID: имя, статус, тип, размер, зона, локация, preset, подключённые сервисы.",
  inputSchema,
  handler,
};
