import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listServerConfiguratorsAction } from "../actions/list-server-configurators.action";

const inputSchema = {};

const handler = async () => {
  try {
    const configurators = await listServerConfiguratorsAction();

    if (configurators.length === 0) {
      return createToolResponse("Конфигураторы серверов не найдены.");
    }

    const lines = configurators.map((c) => {
      const r = c.requirements;
      const gpu =
        r.gpu_min != null || r.gpu_max != null
          ? `\n  🎮 GPU: ${r.gpu_min ?? "—"}…${r.gpu_max ?? "—"} (шаг ${r.gpu_step ?? "—"})`
          : "";
      return (
        `• ID ${c.id} — 📍 ${c.location} | диск: ${c.disk_type} | CPU: ${c.cpu_frequency}GHz | локальная сеть: ${c.is_allowed_local_network ? "да" : "нет"}\n` +
        `  🖥️ CPU: ${r.cpu_min}…${r.cpu_max} (шаг ${r.cpu_step})\n` +
        `  💾 RAM (MB): ${r.ram_min}…${r.ram_max} (шаг ${r.ram_step})\n` +
        `  💿 Диск (MB): ${r.disk_min}…${r.disk_max} (шаг ${r.disk_step})\n` +
        `  🌐 Канал (Мбит/с): ${r.network_bandwidth_min}…${r.network_bandwidth_max} (шаг ${r.network_bandwidth_step})` +
        gpu
      );
    });

    return createToolResponse(
      `⚙️ Конфигураторы VPS (${configurators.length}):\n\n${lines.join("\n\n")}\n\n💡 Используйте ID в поле configurator.configurator_id при создании/изменении VPS с произвольной конфигурацией.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения конфигураторов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении конфигураторов"
    );
  }
};

export const listServerConfiguratorsTool = {
  name: ToolNames.LIST_SERVER_CONFIGURATORS,
  title: "Список конфигураторов VPS",
  description:
    "Возвращает конфигураторы серверов с диапазонами CPU/RAM/Disk/Bandwidth/GPU и шагами изменения. Используй, если нужно создать VPS с произвольной конфигурацией (не тарифом).",
  inputSchema,
  handler,
};
