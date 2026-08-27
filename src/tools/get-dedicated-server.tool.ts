import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDedicatedServerAction } from "../actions/get-dedicated-server.action";

const inputSchema = {
  dedicated_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID выделенного сервера (получить через list_dedicated_servers)"
    ),
};

const handler = async (params: { dedicated_id: number }) => {
  try {
    const s = await getDedicatedServerAction(params.dedicated_id);
    return createToolResponse(
      `Выделенный сервер ${s.id} — ${s.name}\n\n` +
        `Статус: ${s.status}\n` +
        `Локация: ${s.location}\n` +
        `CPU: ${s.cpu_description}\n` +
        `RAM: ${s.ram_description}\n` +
        `HDD: ${s.hdd_description}\n` +
        `IPv4: ${s.ip ?? "—"}\n` +
        `IPv6: ${s.ipv6 ?? "—"}\n` +
        `IPMI IP: ${s.ipmi_ip ?? "—"}\n` +
        `IPMI login: ${s.ipmi_login ?? "—"}\n` +
        `VNC pass: ${s.vnc_pass ?? "—"}\n` +
        `Preset ID: ${s.preset_id}\n` +
        `Plan ID: ${s.plan_id ?? "—"}\n` +
        `OS ID: ${s.os_id ?? "—"}, CP ID: ${s.cp_id ?? "—"}\n` +
        `Bandwidth ID: ${s.bandwidth_id ?? "—"}, Network drive ID: ${s.network_drive_id ?? "—"}\n` +
        `Additional IP addr ID: ${s.additional_ip_addr_id ?? "—"}\n` +
        `Project ID: ${s.project_id ?? "—"}\n` +
        `Цена: ${s.price} руб\n` +
        `Autoinstall ready: ${s.autoinstall_ready ?? "—"}, pre-installed: ${s.is_pre_installed ?? "—"}\n` +
        `Комментарий: ${s.comment || "—"}\n` +
        `Создан: ${new Date(s.created_at).toLocaleString("ru-RU")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения выделенного сервера ${params.dedicated_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении выделенного сервера"
    );
  }
};

export const getDedicatedServerTool = {
  name: ToolNames.GET_DEDICATED_SERVER,
  title: "Получение выделенного сервера",
  description:
    "Возвращает детальную информацию по конкретному выделенному (dedicated) серверу: статус, CPU/RAM/HDD, IP-адреса, IPMI-доступ, VNC-пароль, параметры тарифа, цена, комментарий. Используй, когда нужны подробности по одному серверу (например, IPMI-учётка для подключения).",
  inputSchema,
  handler,
};
