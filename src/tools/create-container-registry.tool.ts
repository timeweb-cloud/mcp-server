import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createContainerRegistryAction } from "../actions/create-container-registry.action";

const inputSchema = {
  name: z
    .string()
    .regex(
      /^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$/,
      "Имя должно быть 3-48 символов: латиница в нижнем регистре, цифры, «-», без пробелов, начинаться/заканчиваться буквой или цифрой"
    )
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Имя реестра. Уникальное, 3-48 символов, только [a-z0-9-], без пробелов"
    ),
  description: z.string().optional().describe("Описание реестра (опц.)"),
  preset_id: z
    .number()
    .optional()
    .describe(
      "Режим 1: ID готового тарифа (получить через list_container_registry_presets). Нельзя вместе с configurator_id."
    ),
  configurator_id: z
    .number()
    .optional()
    .describe(
      "Режим 2: ID конфигуратора для кастомной конфигурации. Нельзя вместе с preset_id."
    ),
  disk: z
    .number()
    .optional()
    .describe(
      "Для configurator-режима: размер диска в ГБ. ОБЯЗАТЕЛЬНО если передан configurator_id."
    ),
  project_id: z
    .number()
    .optional()
    .describe("ID проекта, в который добавить реестр (опц.)"),
};

const handler = async (params: {
  name: string;
  description?: string;
  preset_id?: number;
  configurator_id?: number;
  disk?: number;
  project_id?: number;
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
  if (params.configurator_id && !params.disk) {
    return createToolResponse(
      "❌ При использовании configurator_id обязательно укажи disk (размер диска в ГБ)."
    );
  }

  try {
    const body: any = {
      name: params.name,
      ...(params.description !== undefined && {
        description: params.description,
      }),
      ...(params.project_id !== undefined && { project_id: params.project_id }),
    };
    if (params.preset_id) {
      body.preset_id = params.preset_id;
    } else {
      body.configuration = {
        id: params.configurator_id!,
        disk: params.disk!,
      };
    }

    const r = await createContainerRegistryAction(body);

    return createToolResponse(`✅ Реестр контейнеров создан!

📋 Детали:
• ID: ${r.id}
• Имя: ${r.name}
• Описание: ${r.description || "—"}
• Preset ID: ${r.preset_id}
• Configurator ID: ${r.configurator_id}
• Project ID: ${r.project_id}
• Диск: ${r.disk_stats.size} ГБ
• Создан: ${new Date(r.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать реестр контейнеров. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании реестра");
  }
};

export const createContainerRegistryTool = {
  name: ToolNames.CREATE_CONTAINER_REGISTRY,
  title: "Создание реестра контейнеров",
  description:
    "Создаёт новый реестр контейнеров (Container Registry). Укажи либо preset_id (готовый тариф), либо configurator_id + disk (кастомная конфигурация). Имя должно быть уникальным, 3-48 символов, только [a-z0-9-].",
  inputSchema,
  handler,
};
