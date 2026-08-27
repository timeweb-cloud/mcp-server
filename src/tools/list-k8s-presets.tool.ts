import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sPresetsAction } from "../actions/list-k8s-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await listK8sPresetsAction();
    if (presets.length === 0) {
      return createToolResponse("Нет доступных тарифов Kubernetes.");
    }

    const lines = presets.map((p) => {
      const limitStr = p.type === "master" && p.limit ? `, лимит воркеров: ${p.limit}` : "";
      return `• ID ${p.id} (${p.type}) — ${p.description_short}\n  CPU: ${p.cpu}, RAM: ${p.ram}, Disk: ${p.disk}, Network: ${p.network}, Цена: ${p.price}${limitStr}`;
    });

    return createToolResponse(
      `Тарифы Kubernetes (${presets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении тарифов");
  }
};

export const listK8sPresetsTool = {
  name: ToolNames.LIST_K8S_PRESETS,
  title: "Список тарифов Kubernetes",
  description:
    "Возвращает тарифы для мастер- и воркер-нод: ID, тип (master/worker), CPU, RAM, Disk, Network, цену. Используй перед созданием кластера или группы нод.",
  inputSchema,
  handler,
};
