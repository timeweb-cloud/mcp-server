import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listNetworkDrivesAction } from "../actions/list-network-drives.action";

const inputSchema = {};

const handler = async () => {
  try {
    const drives = await listNetworkDrivesAction();

    if (drives.length === 0) {
      return createToolResponse("Сетевых дисков на аккаунте нет.");
    }

    const lines = drives.map((d) => {
      const services =
        d.service_list && d.service_list.length > 0
          ? d.service_list
              .map((s) => `${s.resource_type}#${s.resource_id}`)
              .join(", ")
          : "не подключён";
      return `• ID ${d.id} — ${d.name}\n  статус: ${d.status}, тип: ${d.type}, размер: ${d.size} ГБ, зона: ${d.availability_zone}, локация: ${d.location}, preset_id: ${d.preset_id}\n  подключения: ${services}\n  комментарий: ${d.comment ?? "—"}`;
    });

    return createToolResponse(
      `Сетевые диски (${drives.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка сетевых дисков. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении сетевых дисков"
    );
  }
};

export const listNetworkDrivesTool = {
  name: ToolNames.LIST_NETWORK_DRIVES,
  title: "Список сетевых дисков",
  description:
    "Возвращает список всех сетевых дисков аккаунта с ключевыми параметрами: ID, имя, статус, тип (nvme/hdd), размер, зона доступности, локация, preset_id, подключённые сервисы. Используй перед любой операцией над диском, чтобы получить его ID.",
  inputSchema,
  handler,
};
