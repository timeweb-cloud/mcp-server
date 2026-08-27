import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateContainerRegistryAction } from "../actions/update-container-registry.action";

const inputSchema = {
  registry_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID реестра для обновления"),
  description: z.string().optional().describe("Новое описание реестра"),
  preset_id: z
    .number()
    .optional()
    .describe("Новый ID тарифа. Нельзя вместе с configurator_id."),
  configurator_id: z
    .number()
    .optional()
    .describe(
      "ID конфигуратора для кастомной конфигурации. Нельзя вместе с preset_id."
    ),
  disk: z
    .number()
    .optional()
    .describe(
      "Для configurator-режима: размер диска в ГБ. ОБЯЗАТЕЛЬНО если передан configurator_id."
    ),
};

const handler = async (params: {
  registry_id: number;
  description?: string;
  preset_id?: number;
  configurator_id?: number;
  disk?: number;
}) => {
  if (params.preset_id && params.configurator_id) {
    return createToolResponse(
      "❌ Нельзя передавать одновременно preset_id и configurator_id. Выбери один режим."
    );
  }
  if (params.configurator_id && !params.disk) {
    return createToolResponse(
      "❌ При использовании configurator_id обязательно укажи disk (размер диска в ГБ)."
    );
  }
  if (
    params.description === undefined &&
    !params.preset_id &&
    !params.configurator_id
  ) {
    return createToolResponse(
      "❌ Нужно передать хотя бы одно поле для обновления: description, preset_id или configurator_id."
    );
  }

  try {
    const body: any = {};
    if (params.description !== undefined) body.description = params.description;
    if (params.preset_id) body.preset_id = params.preset_id;
    if (params.configurator_id)
      body.configuration = {
        id: params.configurator_id,
        disk: params.disk!,
      };

    const r = await updateContainerRegistryAction(params.registry_id, body);
    return createToolResponse(
      `✅ Реестр ${r.id} обновлён.\n` +
        `Имя: ${r.name}\n` +
        `Описание: ${r.description || "—"}\n` +
        `Preset ID: ${r.preset_id}, Configurator ID: ${r.configurator_id}\n` +
        `Диск: ${r.disk_stats.used}/${r.disk_stats.size} ГБ`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить реестр ${params.registry_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении реестра");
  }
};

export const updateContainerRegistryTool = {
  name: ToolNames.UPDATE_CONTAINER_REGISTRY,
  title: "Обновление реестра контейнеров",
  description:
    "Изменяет параметры реестра контейнеров: описание, тариф (preset_id) или кастомную конфигурацию (configurator_id + disk). Имя реестра изменить нельзя.",
  inputSchema,
  handler,
};
