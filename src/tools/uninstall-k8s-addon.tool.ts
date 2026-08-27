import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { uninstallK8sAddonAction } from "../actions/uninstall-k8s-addon.action";

const inputSchema = {
  cluster_id: z.number().int().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
  addon_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID дополнения для удаления"),
};

const handler = async (params: { cluster_id: number; addon_id: number }) => {
  try {
    await uninstallK8sAddonAction(params.cluster_id, params.addon_id);
    return createToolResponse(
      `✅ Дополнение ${params.addon_id} удалено из кластера ${params.cluster_id}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления дополнения. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при удалении дополнения"
    );
  }
};

export const uninstallK8sAddonTool = {
  name: ToolNames.UNINSTALL_K8S_ADDON,
  title: "Удаление дополнения из кластера",
  description:
    "Удаляет установленное ранее дополнение из кластера. Действие необратимо.",
  inputSchema,
  handler,
};
