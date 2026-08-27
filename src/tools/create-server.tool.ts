import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createServerAction } from "../actions/create-server.action";
import { CreateServerRequestDto } from "../types/dto/create-server-request.dto";

const inputSchema = {
  name: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя сервера (до 255 символов)"),
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
      "Режим 2: ID конфигуратора (для кастомной конфигурации). Нельзя использовать вместе с preset_id. Требует cpu, ram, disk."
    ),
  cpu: z
    .number()
    .optional()
    .describe("Для configurator-режима: количество ядер CPU (обязательно)"),
  ram: z
    .number()
    .optional()
    .describe("Для configurator-режима: RAM в МБ (обязательно)"),
  disk: z
    .number()
    .optional()
    .describe("Для configurator-режима: размер диска в МБ (обязательно)"),
  gpu: z
    .number()
    .optional()
    .describe("Для configurator-режима: количество GPU (опц.)"),
  os_id: z
    .number()
    .optional()
    .describe(
      "ID операционной системы. Нельзя использовать вместе с image_id."
    ),
  image_id: z
    .string()
    .optional()
    .describe(
      "UUID образа (snapshot). Нельзя использовать вместе с os_id."
    ),
  software_id: z
    .number()
    .optional()
    .describe("ID ПО из маркетплейса (опц.)"),
  bandwidth: z
    .number()
    .optional()
    .describe(
      "Пропускная способность в Мбит/с: от 100 до 1000, шаг 100 (опц.)"
    ),
  avatar_id: z.string().optional().describe("ID аватара сервера (опц.)"),
  comment: z
    .string()
    .optional()
    .describe("Комментарий к серверу (до 255 символов)"),
  ssh_keys_ids: z
    .array(z.number())
    .optional()
    .describe("Массив ID SSH-ключей"),
  is_ddos_guard: z
    .boolean()
    .optional()
    .describe("Включить DDoS-защиту (L3/L4)"),
  availability_zone: z
    .string()
    .optional()
    .describe("Зона доступности (например: spb-3, msk-1)"),
  project_id: z.number().optional().describe("ID проекта (опц.)"),
  hostname: z.string().optional().describe("Сетевое имя сервера (опц.)"),
  cloud_init: z
    .string()
    .optional()
    .describe("Cloud-init скрипт (опц.)"),
};

const handler = async (params: {
  name: string;
  preset_id?: number;
  configurator_id?: number;
  cpu?: number;
  ram?: number;
  disk?: number;
  gpu?: number;
  os_id?: number;
  image_id?: string;
  software_id?: number;
  bandwidth?: number;
  avatar_id?: string;
  comment?: string;
  ssh_keys_ids?: number[];
  is_ddos_guard?: boolean;
  availability_zone?: string;
  project_id?: number;
  hostname?: string;
  cloud_init?: string;
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
  if (params.os_id && params.image_id) {
    return createToolResponse(
      "❌ Нельзя передавать одновременно os_id и image_id. Выбери одно."
    );
  }
  if (!params.os_id && !params.image_id) {
    return createToolResponse(
      "❌ Нужен либо os_id (ОС из каталога), либо image_id (UUID образа/snapshot)."
    );
  }
  if (params.configurator_id) {
    if (
      params.cpu === undefined ||
      params.ram === undefined ||
      params.disk === undefined
    ) {
      return createToolResponse(
        "❌ В режиме configurator_id обязательны поля cpu, ram, disk."
      );
    }
  }

  try {
    const body: CreateServerRequestDto = {
      name: params.name,
    };

    if (params.preset_id) {
      body.preset_id = params.preset_id;
    } else {
      body.configuration = {
        configurator_id: params.configurator_id!,
        cpu: params.cpu!,
        ram: params.ram!,
        disk: params.disk!,
        ...(params.gpu !== undefined && { gpu: params.gpu }),
      };
    }

    if (params.os_id !== undefined) body.os_id = params.os_id;
    if (params.image_id !== undefined) body.image_id = params.image_id;
    if (params.software_id !== undefined)
      body.software_id = params.software_id;
    if (params.bandwidth !== undefined) body.bandwidth = params.bandwidth;
    if (params.avatar_id !== undefined) body.avatar_id = params.avatar_id;
    if (params.comment !== undefined) body.comment = params.comment;
    if (params.ssh_keys_ids !== undefined)
      body.ssh_keys_ids = params.ssh_keys_ids;
    if (params.is_ddos_guard !== undefined)
      body.is_ddos_guard = params.is_ddos_guard;
    if (params.availability_zone !== undefined)
      body.availability_zone = params.availability_zone;
    if (params.project_id !== undefined) body.project_id = params.project_id;
    if (params.hostname !== undefined) body.hostname = params.hostname;
    if (params.cloud_init !== undefined) body.cloud_init = params.cloud_init;

    const server = await createServerAction(body);

    return createToolResponse(
      `✅ Сервер создан.\n\n` +
        `📋 Детали:\n` +
        `• ID: ${server.id}\n` +
        `• Имя: ${server.name}\n` +
        `• Статус: ${server.status}\n` +
        `• CPU: ${server.cpu}, RAM: ${server.ram} MB\n` +
        `• Локация: ${server.location}\n` +
        `• ОС: ${server.os?.name ?? "—"}\n` +
        `• Preset: ${server.preset_id ?? "custom"}\n\n` +
        `ℹ️ Создание занимает несколько минут. Проверь статус через get_server.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать сервер. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании сервера");
  }
};

export const createServerTool = {
  name: ToolNames.CREATE_SERVER,
  title: "Создание сервера",
  description:
    "Создаёт новый облачный сервер. Выбор режима: preset_id XOR configurator_id (+cpu/ram/disk/[gpu]). Выбор ОС: os_id XOR image_id. Поддерживает ssh_keys_ids, is_ddos_guard, bandwidth, availability_zone, project_id, hostname, cloud_init.",
  inputSchema,
  handler,
};
