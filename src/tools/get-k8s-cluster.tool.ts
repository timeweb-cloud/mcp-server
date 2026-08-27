import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getK8sClusterAction } from "../actions/get-k8s-cluster.action";

const inputSchema = {
  cluster_id: z
    .number()
    .int()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID кластера"),
};

const handler = async (params: { cluster_id: number }) => {
  try {
    const c = await getK8sClusterAction(params.cluster_id);
    return createToolResponse(`📋 Kubernetes-кластер ID ${c.id}

• Название: ${c.name}
• Описание: ${c.description || "—"}
• Статус: ${c.status}
• Версия: ${c.k8s_version}
• Сетевой драйвер: ${c.network_driver}
• Зона: ${c.availability_zone ?? "—"}
• Ingress: ${c.ingress ? "вкл" : "выкл"}
• Preset мастер-ноды: ${c.preset_id}
• CPU: ${c.cpu ?? 0}, RAM: ${c.ram ?? 0} МБ, Disk: ${c.disk ?? 0} МБ
• Проект: ${c.project_id ?? "—"}
• Создан: ${new Date(c.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения кластера ${params.cluster_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении кластера");
  }
};

export const getK8sClusterTool = {
  name: ToolNames.GET_K8S_CLUSTER,
  title: "Информация о Kubernetes-кластере",
  description:
    "Возвращает детальную информацию о Kubernetes-кластере по его ID: имя, статус, версия, драйвер, ресурсы, зона, ingress.",
  inputSchema,
  handler,
};
