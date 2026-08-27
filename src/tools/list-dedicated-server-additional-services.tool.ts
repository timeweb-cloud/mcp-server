import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listDedicatedServerAdditionalServicesAction } from "../actions/list-dedicated-server-additional-services.action";

const inputSchema = {
  preset_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID тарифа выделенного сервера (получить через list_dedicated_server_presets)"
    ),
};

const handler = async (params: { preset_id: number }) => {
  try {
    const services = await listDedicatedServerAdditionalServicesAction(
      params.preset_id
    );

    if (services.length === 0) {
      return createToolResponse(
        `Для тарифа ${params.preset_id} нет дополнительных услуг.`
      );
    }

    const lines = services.map(
      (s) =>
        `• ID ${s.id} — ${s.short_description}\n  имя: ${s.name}, цена: ${s.price} руб, период: ${s.period}\n  описание: ${s.description}`
    );

    return createToolResponse(
      `Дополнительные услуги для тарифа ${params.preset_id} (${services.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения дополнительных услуг для тарифа ${params.preset_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении дополнительных услуг"
    );
  }
};

export const listDedicatedServerAdditionalServicesTool = {
  name: ToolNames.LIST_DEDICATED_SERVER_ADDITIONAL_SERVICES,
  title: "Дополнительные услуги выделенного сервера",
  description:
    "Возвращает список дополнительных услуг для конкретного тарифа выделенного сервера (plan_id): ID, имя, цена, период, описание. Используй, чтобы узнать plan_id для передачи в create_dedicated_server.",
  inputSchema,
  handler,
};
