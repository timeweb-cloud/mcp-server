import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerOsAction } from "../actions/list-server-os.action";

const inputSchema = {};

const handler = async () => {
  try {
    const oses = await listServerOsAction();

    if (oses.length === 0) {
      return createToolResponse("Доступных ОС не найдено.");
    }

    const lines = oses.map((o) => {
      const req = o.requirements
        ? `  📐 Мин. требования: CPU ${o.requirements.cpu_min ?? "—"}, RAM ${o.requirements.ram_min ?? "—"}, Диск ${o.requirements.disk_min ?? "—"}, Канал ${o.requirements.bandwidth_min ?? "—"}`
        : "";
      const codename = o.version_codename ? ` (${o.version_codename})` : "";
      const family = o.family ? ` | ${o.family}` : "";
      return (
        `• ID ${o.id} — ${o.name} ${o.version}${codename}${family}` +
        (req ? `\n${req}` : "")
      );
    });

    return createToolResponse(
      `💿 Операционные системы (${oses.length}):\n\n${lines.join("\n")}\n\n💡 Используйте ID при создании VPS в поле os_id.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка ОС. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении списка ОС");
  }
};

export const listServerOsTool = {
  name: ToolNames.LIST_SERVER_OS,
  title: "Список ОС для VPS",
  description:
    "Возвращает список операционных систем, доступных для установки на VPS-сервер: ID, семейство, имя, версия, codename, минимальные требования. Используй перед созданием VPS, чтобы выбрать os_id.",
  inputSchema,
  handler,
};
