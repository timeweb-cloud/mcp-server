import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createK8sNodeGroupAction } from "../actions/create-k8s-node-group.action";

const configurationSchema = z.object({
  configurator_id: z.number().int(),
  disk: z.number().int(),
  cpu: z.number().int(),
  ram: z.number().int(),
  gpu: z.number().int().optional(),
});

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - название группы"),
  node_count: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - количество нод (1–100)"),
  preset_id: z
    .number()
    .int()
    .optional()
    .describe("ID тарифа воркер-ноды (взаимоисключающе с configuration)"),
  configuration: configurationSchema
    .optional()
    .describe("Кастомная конфигурация воркер-ноды"),
  labels: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .optional()
    .describe("Лейблы для группы"),
  is_autoscaling: z.boolean().optional().describe("Автомасштабирование"),
  "min-size": z
    .number()
    .int()
    .min(2)
    .optional()
    .describe("Минимум нод (для автомасштабирования)"),
  "max-size": z
    .number()
    .int()
    .min(2)
    .optional()
    .describe("Максимум нод (для автомасштабирования)"),
  is_autohealing: z.boolean().optional().describe("Автовосстановление нод"),
};

const handler = async (params: {
  cluster_id: number;
  name: string;
  node_count: number;
  preset_id?: number;
  configuration?: {
    configurator_id: number;
    disk: number;
    cpu: number;
    ram: number;
    gpu?: number;
  };
  labels?: Array<{ key: string; value: string }>;
  is_autoscaling?: boolean;
  "min-size"?: number;
  "max-size"?: number;
  is_autohealing?: boolean;
}) => {
  try {
    if (params.preset_id && params.configuration) {
      return createToolResponse(
        "❌ Нельзя одновременно указывать preset_id и configuration. Выбери одно."
      );
    }
    if (!params.preset_id && !params.configuration) {
      return createToolResponse(
        "❌ Нужно указать либо preset_id, либо configuration для воркер-ноды."
      );
    }

    const group = await createK8sNodeGroupAction(params.cluster_id, {
      name: params.name,
      node_count: params.node_count,
      preset_id: params.preset_id,
      configuration: params.configuration,
      labels: params.labels,
      is_autoscaling: params.is_autoscaling,
      "min-size": params["min-size"],
      "max-size": params["max-size"],
      is_autohealing: params.is_autohealing,
    });

    return createToolResponse(
      `✅ Группа нод создана: ID ${group.id}, ${group.name}, preset ${group.preset_id}, нод: ${group.node_count}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания группы нод. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при создании группы нод"
    );
  }
};

export const createK8sNodeGroupTool = {
  name: ToolNames.CREATE_K8S_NODE_GROUP,
  title: "Создание группы нод",
  description:
    "Создаёт новую группу воркер-нод в кластере. Обязательные: name, node_count. Для тарифа — либо preset_id, либо configuration (взаимоисключающе).",
  inputSchema,
  handler,
};
