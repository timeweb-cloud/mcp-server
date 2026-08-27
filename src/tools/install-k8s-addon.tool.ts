import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { installK8sAddonAction } from "../actions/install-k8s-addon.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  type: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип дополнения (например, ingress, dbaas-operator)"
    ),
  config_type: z
    .enum(["basic", "custom"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип конфигурации: basic или custom"),
  yaml_config: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - YAML-конфигурация дополнения"),
  version: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - версия дополнения (например, 4.12.1)"),
};

const handler = async (params: {
  cluster_id: number;
  type: string;
  config_type: "basic" | "custom";
  yaml_config: string;
  version: string;
}) => {
  try {
    await installK8sAddonAction(params.cluster_id, {
      type: params.type,
      config_type: params.config_type,
      yaml_config: params.yaml_config,
      version: params.version,
    });
    return createToolResponse(
      `✅ Дополнение ${params.type} v${params.version} установлено в кластер ${params.cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка установки дополнения. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при установке дополнения");
  }
};

export const installK8sAddonTool = {
  name: ToolNames.INSTALL_K8S_ADDON,
  title: "Установка дополнения в кластер",
  description:
    "Устанавливает дополнение (addon) в кластер. Нужны тип, версия, config_type (basic/custom) и YAML-конфигурация. Каталог доступных дополнений — list_k8s_addon_configs.",
  inputSchema,
  handler,
};
