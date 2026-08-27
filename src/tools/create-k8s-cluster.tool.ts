import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createK8sClusterAction } from "../actions/create-k8s-cluster.action";
import {
  CreateK8sClusterRequestDto,
  K8sWorkerGroupIn,
} from "../types/dto/create-k8s-cluster-request.dto";

const networkDriverEnum = z.enum([
  "kuberouter",
  "calico",
  "flannel",
  "cilium",
]);
const availabilityZoneEnum = z.enum(["spb-3", "msk-1", "ams-1", "fra-1"]);

const configurationSchema = z
  .object({
    configurator_id: z.number().int(),
    disk: z.number().int(),
    cpu: z.number().int(),
    ram: z.number().int(),
  })
  .describe(
    "Параметры конфигурации мастер-ноды (нельзя передавать вместе с preset_id)"
  );

const workerGroupSchema = z
  .object({
    name: z.string(),
    node_count: z.number().int().min(1).max(100),
    preset_id: z.number().int().optional(),
    configuration: z
      .object({
        configurator_id: z.number().int(),
        disk: z.number().int(),
        cpu: z.number().int(),
        ram: z.number().int(),
        gpu: z.number().int().optional(),
      })
      .optional(),
    labels: z
      .array(z.object({ key: z.string(), value: z.string() }))
      .optional(),
    is_autoscaling: z.boolean().optional(),
    "min-size": z.number().int().min(2).optional(),
    "max-size": z.number().int().min(2).optional(),
    is_autohealing: z.boolean().optional(),
  })
  .describe("Описание одной worker-группы");

const inputSchema = {
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - название кластера"),
  k8s_version: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - версия Kubernetes (получить через list_k8s_versions)"
    ),
  network_driver: networkDriverEnum.describe(
    "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - сетевой драйвер: kuberouter, calico, flannel, cilium"
  ),
  description: z.string().optional().describe("Описание кластера"),
  availability_zone: availabilityZoneEnum
    .optional()
    .describe("Зона доступности: spb-3, msk-1, ams-1, fra-1"),
  is_ingress: z.boolean().optional().describe("Включить Ingress-контроллер"),
  is_k8s_dashboard: z
    .boolean()
    .optional()
    .describe("Включить Kubernetes Dashboard"),
  preset_id: z
    .number()
    .int()
    .optional()
    .describe(
      "ID тарифа мастер-ноды (взаимоисключающе с configuration)"
    ),
  configuration: configurationSchema.optional(),
  master_nodes_count: z
    .number()
    .int()
    .optional()
    .describe("Количество мастер-нод"),
  worker_groups: z
    .array(workerGroupSchema)
    .optional()
    .describe("Группы воркер-нод"),
  network_id: z.string().optional().describe("ID приватной сети (VPC)"),
  project_id: z.number().int().optional().describe("ID проекта"),
};

const handler = async (params: {
  name: string;
  k8s_version: string;
  network_driver: "kuberouter" | "calico" | "flannel" | "cilium";
  description?: string;
  availability_zone?: "spb-3" | "msk-1" | "ams-1" | "fra-1";
  is_ingress?: boolean;
  is_k8s_dashboard?: boolean;
  preset_id?: number;
  configuration?: {
    configurator_id: number;
    disk: number;
    cpu: number;
    ram: number;
  };
  master_nodes_count?: number;
  worker_groups?: K8sWorkerGroupIn[];
  network_id?: string;
  project_id?: number;
}) => {
  try {
    if (params.preset_id && params.configuration) {
      return createToolResponse(
        "❌ Нельзя одновременно указывать preset_id и configuration для мастер-ноды. Выбери одно."
      );
    }

    const data: CreateK8sClusterRequestDto = {
      name: params.name,
      k8s_version: params.k8s_version,
      network_driver: params.network_driver,
      description: params.description,
      availability_zone: params.availability_zone,
      is_ingress: params.is_ingress,
      is_k8s_dashboard: params.is_k8s_dashboard,
      preset_id: params.preset_id,
      configuration: params.configuration,
      master_nodes_count: params.master_nodes_count,
      worker_groups: params.worker_groups,
      network_id: params.network_id,
      project_id: params.project_id,
    };

    const cluster = await createK8sClusterAction(data);

    return createToolResponse(`✅ Kubernetes-кластер создан!

📋 Детали:
• ID: ${cluster.id}
• Название: ${cluster.name}
• Статус: ${cluster.status}
• Версия: ${cluster.k8s_version}
• Сетевой драйвер: ${cluster.network_driver}
• Зона: ${cluster.availability_zone ?? "—"}
• Ingress: ${cluster.ingress ? "вкл" : "выкл"}
• Preset мастер-ноды: ${cluster.preset_id}
• Создан: ${new Date(cluster.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания кластера. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании кластера");
  }
};

export const createK8sClusterTool = {
  name: ToolNames.CREATE_K8S_CLUSTER,
  title: "Создание Kubernetes-кластера",
  description:
    "Создаёт новый Kubernetes-кластер. Обязательные параметры: name, k8s_version, network_driver. Для мастер-ноды укажи либо preset_id, либо configuration (взаимоисключающе). Опционально задай worker_groups, OIDC, зону, ingress.",
  inputSchema,
  handler,
};
