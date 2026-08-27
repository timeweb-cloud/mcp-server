import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sAddonConfigsAction } from "../actions/list-k8s-addon-configs.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
};

const handler = async (params: { cluster_id: number }) => {
  try {
    const addons = await listK8sAddonConfigsAction(params.cluster_id);
    if (addons.length === 0) {
      return createToolResponse("Нет доступных конфигураций дополнений.");
    }

    const lines = addons.map(
      (a) =>
        `• ID ${a.id} — ${a.type} v${a.version}${a.dependencies.length ? `, зависимости: ${a.dependencies.join(", ")}` : ""}`
    );

    return createToolResponse(
      `Каталог дополнений для кластера ${params.cluster_id} (${addons.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения каталога дополнений. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении каталога дополнений"
    );
  }
};

export const listK8sAddonConfigsTool = {
  name: ToolNames.LIST_K8S_ADDON_CONFIGS,
  title: "Каталог дополнений кластера",
  description:
    "Возвращает доступные для установки в кластер дополнения (аддоны): тип, версию, зависимости и базовый YAML-шаблон.",
  inputSchema,
  handler,
};
