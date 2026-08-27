import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { resizeServerAction } from "../actions/resize-server.action";

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  preset_id: z
    .number()
    .optional()
    .describe(
      "Режим 1: ID готового тарифа. Нельзя использовать вместе с configurator_id."
    ),
  configurator_id: z
    .number()
    .optional()
    .describe(
      "Режим 2: ID конфигуратора (для кастомной конфигурации). Нельзя использовать вместе с preset_id."
    ),
  cpu: z
    .number()
    .optional()
    .describe("Для configurator-режима: количество ядер CPU"),
  ram: z
    .number()
    .optional()
    .describe("Для configurator-режима: RAM в МБ"),
  disk: z
    .number()
    .optional()
    .describe("Для configurator-режима: размер диска в МБ"),
  gpu: z
    .number()
    .optional()
    .describe("Для configurator-режима: количество GPU"),
};

const handler = async (params: {
  server_id: number;
  preset_id?: number;
  configurator_id?: number;
  cpu?: number;
  ram?: number;
  disk?: number;
  gpu?: number;
}) => {
  if (params.preset_id && params.configurator_id) {
    return createToolResponse(
      "❌ Нельзя передавать одновременно preset_id и configurator_id. Выбери один режим."
    );
  }
  if (!params.preset_id && !params.configurator_id) {
    return createToolResponse(
      "❌ Нужен либо preset_id (готовый тариф), либо configurator_id (кастомная конфигурация)."
    );
  }

  try {
    const body = params.preset_id
      ? { preset_id: params.preset_id }
      : {
          configurator: {
            configurator_id: params.configurator_id!,
            ...(params.cpu !== undefined && { cpu: params.cpu }),
            ...(params.ram !== undefined && { ram: params.ram }),
            ...(params.disk !== undefined && { disk: params.disk }),
            ...(params.gpu !== undefined && { gpu: params.gpu }),
          },
        };

    const server = await resizeServerAction(params.server_id, body);
    return createToolResponse(
      `✅ Сервер ${server.id} переконфигурирован.\n` +
        `Новая конфигурация: CPU ${server.cpu}, RAM ${server.ram} MB, preset ${server.preset_id ?? "custom"}.\n` +
        `Статус: ${server.status} — процесс ресайза занимает несколько минут.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось изменить конфигурацию сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при ресайзе");
  }
};

export const resizeServerTool = {
  name: ToolNames.RESIZE_SERVER,
  title: "Изменение конфигурации сервера",
  description:
    "Меняет тариф (preset_id) или кастомную конфигурацию (configurator_id + cpu/ram/disk/gpu). Применяется к существующему серверу — потребуется downtime. Для получения списка presets используй get_allowed_presets.",
  inputSchema,
  handler,
};
