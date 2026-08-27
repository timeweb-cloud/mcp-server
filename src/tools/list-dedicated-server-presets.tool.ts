import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDedicatedServerPresetsAction } from "../actions/list-dedicated-server-presets.action";
import { DedicatedServerLocation } from "../types/dedicated-server.type";

const locations = ["ru-1", "ru-2", "kz-1", "pl-1"] as const;

const inputSchema = {
  location: z
    .enum(locations)
    .optional()
    .describe(
      "Фильтр по локации: ru-1, ru-2, kz-1, pl-1. Если не указан — возвращаются все тарифы."
    ),
};

const handler = async (params: { location?: DedicatedServerLocation }) => {
  try {
    const presets = await listDedicatedServerPresetsAction(params.location);

    if (presets.length === 0) {
      return createToolResponse(
        params.location
          ? `Тарифы выделенных серверов для локации ${params.location} не найдены.`
          : "Тарифы выделенных серверов не найдены."
      );
    }

    const lines = presets.map(
      (p) =>
        `• ID ${p.id} — ${p.description}\n  CPU: ${p.cpu?.description_short ?? "—"}${p.cpu?.count ? ` (${p.cpu.count} ядер)` : ""}\n  IPMI: ${p.is_ipmi_enabled ? "да" : "нет"}, pre-installed: ${p.is_pre_installed ? "да" : "нет"}`
    );

    return createToolResponse(
      `Тарифы выделенных серверов${params.location ? ` (${params.location})` : ""} — всего ${presets.length}:\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов выделенных серверов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении тарифов выделенных серверов"
    );
  }
};

export const listDedicatedServerPresetsTool = {
  name: ToolNames.LIST_DEDICATED_SERVER_PRESETS,
  title: "Список тарифов выделенных серверов",
  description:
    "Возвращает список доступных тарифов (presets) для выделенных серверов: ID, описание, CPU, IPMI-поддержка, pre-installed. Опциональный фильтр по локации (ru-1/ru-2/kz-1/pl-1). Используй перед create_dedicated_server, чтобы выбрать preset_id.",
  inputSchema,
  handler,
};
