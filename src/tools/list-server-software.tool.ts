import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerSoftwareAction } from "../actions/list-server-software.action";

const inputSchema = {};

const handler = async () => {
  try {
    const software = await listServerSoftwareAction();

    if (software.length === 0) {
      return createToolResponse("ПО из маркетплейса не найдено.");
    }

    const lines = software.map((s) => {
      const osIds =
        s.os_ids && s.os_ids.length ? s.os_ids.join(", ") : "—";
      const req = s.requirements
        ? ` | 📐 мин. CPU ${s.requirements.cpu_min ?? "—"}, RAM ${s.requirements.ram_min ?? "—"}, Диск ${s.requirements.disk_min ?? "—"}`
        : "";
      const desc = s.description ? `\n  ${s.description}` : "";
      return `• ID ${s.id} — ${s.name} | установок: ${s.installations ?? 0} | os_ids: [${osIds}]${req}${desc}`;
    });

    return createToolResponse(
      `🧩 ПО из маркетплейса (${software.length}):\n\n${lines.join("\n")}\n\n💡 Используйте ID в поле software_id при создании VPS (ОС должна быть из os_ids).`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения ПО из маркетплейса. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении списка ПО"
    );
  }
};

export const listServerSoftwareTool = {
  name: ToolNames.LIST_SERVER_SOFTWARE,
  title: "Список ПО из маркетплейса",
  description:
    "Возвращает список ПО из маркетплейса, доступного для установки на VPS при создании: ID, название, совместимые os_ids, требования. Используй, чтобы выбрать software_id.",
  inputSchema,
  handler,
};
