import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createDedicatedServerAction } from "../actions/create-dedicated-server.action";
import { DedicatedServerPaymentPeriod } from "../types/dedicated-server.type";

const paymentPeriods = ["P1M", "P3M", "P6M", "P1Y"] as const;

const inputSchema = {
  preset_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID тарифа выделенного сервера (получить через list_dedicated_server_presets)"
    ),
  payment_period: z
    .enum(paymentPeriods)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Период оплаты: P1M (месяц), P3M (3 мес), P6M (полгода), P1Y (год)"
    ),
  name: z
    .string()
    .max(255)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - Удобочитаемое имя сервера, уникальное, до 255 символов"
    ),
  plan_id: z
    .number()
    .nullable()
    .optional()
    .describe(
      "ID списка дополнительных услуг (получить через list_dedicated_server_additional_services)"
    ),
  os_id: z
    .number()
    .nullable()
    .optional()
    .describe("ID операционной системы для установки"),
  cp_id: z
    .number()
    .nullable()
    .optional()
    .describe("ID панели управления для установки"),
  bandwidth_id: z
    .number()
    .nullable()
    .optional()
    .describe("ID интернет-канала"),
  network_drive_id: z
    .number()
    .optional()
    .describe("ID сетевого диска"),
  additional_ip_addr_id: z
    .number()
    .nullable()
    .optional()
    .describe("ID дополнительного IP-адреса"),
  comment: z
    .string()
    .max(255)
    .nullable()
    .optional()
    .describe("Комментарий к серверу, до 255 символов"),
  project_id: z
    .number()
    .nullable()
    .optional()
    .describe("ID проекта, в который добавить сервер"),
};

const handler = async (params: {
  preset_id: number;
  payment_period: DedicatedServerPaymentPeriod;
  name: string;
  plan_id?: number | null;
  os_id?: number | null;
  cp_id?: number | null;
  bandwidth_id?: number | null;
  network_drive_id?: number;
  additional_ip_addr_id?: number | null;
  comment?: string | null;
  project_id?: number | null;
}) => {
  try {
    const body = {
      preset_id: params.preset_id,
      payment_period: params.payment_period,
      name: params.name,
      ...(params.plan_id !== undefined && { plan_id: params.plan_id }),
      ...(params.os_id !== undefined && { os_id: params.os_id }),
      ...(params.cp_id !== undefined && { cp_id: params.cp_id }),
      ...(params.bandwidth_id !== undefined && {
        bandwidth_id: params.bandwidth_id,
      }),
      ...(params.network_drive_id !== undefined && {
        network_drive_id: params.network_drive_id,
      }),
      ...(params.additional_ip_addr_id !== undefined && {
        additional_ip_addr_id: params.additional_ip_addr_id,
      }),
      ...(params.comment !== undefined && { comment: params.comment }),
      ...(params.project_id !== undefined && { project_id: params.project_id }),
    };

    const s = await createDedicatedServerAction(body);

    return createToolResponse(`✅ Выделенный сервер создан!

📋 Детали:
• ID: ${s.id}
• Имя: ${s.name}
• Статус: ${s.status}
• Preset ID: ${s.preset_id}, Plan ID: ${s.plan_id ?? "—"}
• Локация: ${s.location}
• CPU: ${s.cpu_description}
• RAM: ${s.ram_description}
• HDD: ${s.hdd_description}
• IPv4: ${s.ip ?? "—"}, IPv6: ${s.ipv6 ?? "—"}
• Цена: ${s.price} руб
• Создан: ${new Date(s.created_at).toLocaleString("ru-RU")}

⏳ Установка выделенного сервера может занять от нескольких минут до нескольких часов.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось создать выделенный сервер. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании выделенного сервера"
    );
  }
};

export const createDedicatedServerTool = {
  name: ToolNames.CREATE_DEDICATED_SERVER,
  title: "Создание выделенного сервера",
  description:
    "Создаёт новый выделенный (dedicated) физический сервер. Обязательные поля: preset_id (тариф), payment_period (P1M/P3M/P6M/P1Y), name. Опционально: OS, панель управления, доп. услуги, сетевой диск, IP-адрес, проект. Перед вызовом получи preset_id через list_dedicated_server_presets.",
  inputSchema,
  handler,
};
