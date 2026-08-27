import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateK8sAddonAction } from "../actions/update-k8s-addon.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  addon_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID дополнения"),
  type: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип дополнения (должен совпадать с установленным)"
    ),
  config_type: z
    .enum(["basic", "custom"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип конфигурации: basic или custom"),
  yaml_config: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новая YAML-конфигурация"),
  version: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новая версия дополнения"),
};

const handler = async (params: {
  cluster_id: number;
  addon_id: number;
  type: string;
  config_type: "basic" | "custom";
  yaml_config: string;
  version: string;
}) => {
  try {
    await updateK8sAddonAction(params.cluster_id, params.addon_id, {
      type: params.type,
      config_type: params.config_type,
      yaml_config: params.yaml_config,
      version: params.version,
    });
    return createToolResponse(
      `✅ Дополнение ${params.addon_id} (${params.type} v${params.version}) обновлено в кластере ${params.cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления дополнения. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении дополнения"
    );
  }
};

export const updateK8sAddonTool = {
  name: ToolNames.UPDATE_K8S_ADDON,
  title: "Изменение конфигурации дополнения",
  description:
    "Изменяет конфигурацию или версию ранее установленного дополнения. Нужны type, config_type, yaml_config, version.",
  inputSchema,
  handler,
};
