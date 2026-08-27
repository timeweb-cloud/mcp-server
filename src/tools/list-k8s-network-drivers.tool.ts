import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listK8sNetworkDriversAction } from "../actions/list-k8s-network-drivers.action";

const inputSchema = {};

const handler = async () => {
  try {
    const drivers = await listK8sNetworkDriversAction();
    if (drivers.length === 0) {
      return createToolResponse("Нет доступных сетевых драйверов.");
    }
    return createToolResponse(
      `Сетевые драйверы Kubernetes (${drivers.length}):\n${drivers.map((d) => `• ${d}`).join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения сетевых драйверов. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении сетевых драйверов"
    );
  }
};

export const listK8sNetworkDriversTool = {
  name: ToolNames.LIST_K8S_NETWORK_DRIVERS,
  title: "Список сетевых драйверов Kubernetes",
  description:
    "Возвращает список доступных сетевых драйверов для создания кластера (kuberouter, calico, flannel, cilium).",
  inputSchema,
  handler,
};
