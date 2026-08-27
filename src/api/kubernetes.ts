import { BaseApiClient } from "./client";
import { K8sCluster } from "../types/k8s-cluster.type";
import { K8sNodeGroup } from "../types/k8s-node-group.type";
import { K8sNode } from "../types/k8s-node.type";
import { K8sAddon, K8sAddonConfig } from "../types/k8s-addon.type";
import { K8sPreset } from "../types/k8s-preset.type";
import { K8sResources } from "../types/k8s-resources.type";
import { ListK8sClustersResponseDto } from "../types/dto/list-k8s-clusters-response.dto";
import { GetK8sClusterResponseDto } from "../types/dto/get-k8s-cluster-response.dto";
import { CreateK8sClusterRequestDto } from "../types/dto/create-k8s-cluster-request.dto";
import { EditK8sClusterRequestDto } from "../types/dto/edit-k8s-cluster-request.dto";
import { DeleteK8sClusterResponseDto } from "../types/dto/delete-k8s-cluster-response.dto";
import { GetK8sResourcesResponseDto } from "../types/dto/get-k8s-resources-response.dto";
import { ListK8sNodeGroupsResponseDto } from "../types/dto/list-k8s-node-groups-response.dto";
import { GetK8sNodeGroupResponseDto } from "../types/dto/get-k8s-node-group-response.dto";
import { CreateK8sNodeGroupRequestDto } from "../types/dto/create-k8s-node-group-request.dto";
import { ListK8sNodesResponseDto } from "../types/dto/list-k8s-nodes-response.dto";
import { IncreaseK8sNodesRequestDto } from "../types/dto/increase-k8s-nodes-request.dto";
import { ReduceK8sNodesRequestDto } from "../types/dto/reduce-k8s-nodes-request.dto";
import { ListK8sVersionsResponseDto } from "../types/dto/list-k8s-versions-response.dto";
import { ListK8sNetworkDriversResponseDto } from "../types/dto/list-k8s-network-drivers-response.dto";
import { ListK8sPresetsResponseDto } from "../types/dto/list-k8s-presets-response.dto";
import { ListK8sAddonConfigsResponseDto } from "../types/dto/list-k8s-addon-configs-response.dto";
import { ListK8sAddonsResponseDto } from "../types/dto/list-k8s-addons-response.dto";
import { InstallK8sAddonRequestDto } from "../types/dto/install-k8s-addon-request.dto";
import { UpdateK8sClusterVersionRequestDto } from "../types/dto/update-k8s-cluster-version-request.dto";

export type DeleteK8sClusterResult = {
  hash?: string;
  is_moved_in_quarantine?: boolean;
};

export class KubernetesApiClient extends BaseApiClient {
  /**
   * Получает список кластеров Kubernetes
   */
  async listClusters(limit?: number, offset?: number): Promise<K8sCluster[]> {
    const qs: string[] = [];
    if (typeof limit === "number") qs.push(`limit=${limit}`);
    if (typeof offset === "number") qs.push(`offset=${offset}`);
    const query = qs.length ? `?${qs.join("&")}` : "";
    const response = await this.get<ListK8sClustersResponseDto>(
      `/api/v1/k8s/clusters${query}`
    );
    return response.clusters;
  }

  /**
   * Создаёт новый кластер Kubernetes
   */
  async createCluster(data: CreateK8sClusterRequestDto): Promise<K8sCluster> {
    const response = await this.post<GetK8sClusterResponseDto>(
      "/api/v1/k8s/clusters",
      data
    );
    return response.cluster;
  }

  /**
   * Получает информацию о кластере
   */
  async getCluster(clusterId: number): Promise<K8sCluster> {
    const response = await this.get<GetK8sClusterResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}`
    );
    return response.cluster;
  }

  /**
   * Удаляет кластер. Для аккаунтов с 2FA поддерживает подтверждение через hash и code
   */
  async deleteCluster(
    clusterId: number,
    hash?: string,
    code?: string
  ): Promise<DeleteK8sClusterResult> {
    const qs: string[] = [];
    if (hash) qs.push(`hash=${encodeURIComponent(hash)}`);
    if (code) qs.push(`code=${encodeURIComponent(code)}`);
    const query = qs.length ? `?${qs.join("&")}` : "";
    const response = await this.delete<DeleteK8sClusterResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}${query}`
    );
    return response.cluster_delete;
  }

  /**
   * Обновляет имя/описание/OIDC-провайдера кластера
   */
  async editCluster(
    clusterId: number,
    data: EditK8sClusterRequestDto
  ): Promise<K8sCluster> {
    const response = await this.patch<GetK8sClusterResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}`,
      data
    );
    return response.cluster;
  }

  /**
   * Получает сводку ресурсов кластера (cpu, memory, pods, nodes)
   */
  async getClusterResources(clusterId: number): Promise<K8sResources> {
    const response = await this.get<GetK8sResourcesResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/resources`
    );
    return response.resources;
  }

  /**
   * Получает файл kubeconfig (YAML) для кластера
   */
  async getKubeconfig(clusterId: number): Promise<string> {
    const response = await this.get<unknown>(
      `/api/v1/k8s/clusters/${clusterId}/kubeconfig`
    );
    if (typeof response === "string") {
      return response;
    }
    return JSON.stringify(response);
  }

  /**
   * Обновляет версию Kubernetes в кластере
   */
  async updateClusterVersion(
    clusterId: number,
    data: UpdateK8sClusterVersionRequestDto
  ): Promise<void> {
    await this.patch<void>(
      `/api/v1/k8s/clusters/${clusterId}/versions/update`,
      data
    );
  }

  /**
   * Получает список групп нод кластера
   */
  async listNodeGroups(clusterId: number): Promise<K8sNodeGroup[]> {
    const response = await this.get<ListK8sNodeGroupsResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/groups`
    );
    return response.node_groups;
  }

  /**
   * Создаёт новую группу нод в кластере
   */
  async createNodeGroup(
    clusterId: number,
    data: CreateK8sNodeGroupRequestDto
  ): Promise<K8sNodeGroup> {
    const response = await this.post<GetK8sNodeGroupResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/groups`,
      data
    );
    return response.node_group;
  }

  /**
   * Получает информацию о группе нод
   */
  async getNodeGroup(
    clusterId: number,
    groupId: number
  ): Promise<K8sNodeGroup> {
    const response = await this.get<GetK8sNodeGroupResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/groups/${groupId}`
    );
    return response.node_group;
  }

  /**
   * Удаляет группу нод
   */
  async deleteNodeGroup(clusterId: number, groupId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/k8s/clusters/${clusterId}/groups/${groupId}`
    );
  }

  /**
   * Получает список нод, принадлежащих группе
   */
  async listNodeGroupNodes(
    clusterId: number,
    groupId: number,
    limit?: number,
    offset?: number
  ): Promise<K8sNode[]> {
    const qs: string[] = [];
    if (typeof limit === "number") qs.push(`limit=${limit}`);
    if (typeof offset === "number") qs.push(`offset=${offset}`);
    const query = qs.length ? `?${qs.join("&")}` : "";
    const response = await this.get<ListK8sNodesResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/groups/${groupId}/nodes${query}`
    );
    return response.nodes;
  }

  /**
   * Увеличивает количество нод в группе на указанное количество
   */
  async increaseNodeGroupNodes(
    clusterId: number,
    groupId: number,
    data: IncreaseK8sNodesRequestDto
  ): Promise<K8sNode[]> {
    const response = await this.post<ListK8sNodesResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/groups/${groupId}/nodes`,
      data
    );
    return response.nodes;
  }

  /**
   * Уменьшает количество нод в группе на указанное количество.
   * DELETE с телом запроса (поддерживается через базовый makeRequest).
   */
  async reduceNodeGroupNodes(
    clusterId: number,
    groupId: number,
    data: ReduceK8sNodesRequestDto
  ): Promise<void> {
    await this.makeRequest<void>(
      "DELETE",
      `/api/v1/k8s/clusters/${clusterId}/groups/${groupId}/nodes`,
      data
    );
  }

  /**
   * Получает список всех нод кластера
   */
  async listClusterNodes(clusterId: number): Promise<K8sNode[]> {
    const response = await this.get<ListK8sNodesResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/nodes`
    );
    return response.nodes;
  }

  /**
   * Удаляет конкретную ноду из кластера
   */
  async deleteClusterNode(clusterId: number, nodeId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/k8s/clusters/${clusterId}/nodes/${nodeId}`
    );
  }

  /**
   * Получает список доступных версий Kubernetes
   */
  async listK8sVersions(): Promise<string[]> {
    const response = await this.get<ListK8sVersionsResponseDto>(
      "/api/v1/k8s/k8s-versions"
    );
    return response.k8s_versions;
  }

  /**
   * Получает список сетевых драйверов
   */
  async listNetworkDrivers(): Promise<string[]> {
    const response = await this.get<ListK8sNetworkDriversResponseDto>(
      "/api/v1/k8s/network-drivers"
    );
    return response.network_drivers;
  }

  /**
   * Получает список тарифов (мастер/воркер) для Kubernetes
   */
  async listK8sPresets(): Promise<K8sPreset[]> {
    const response = await this.get<ListK8sPresetsResponseDto>(
      "/api/v1/presets/k8s"
    );
    return response.k8s_presets;
  }

  /**
   * Получает список конфигураций дополнений (каталог доступных аддонов)
   */
  async listAddonConfigs(clusterId: number): Promise<K8sAddonConfig[]> {
    const response = await this.get<ListK8sAddonConfigsResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/addons-configs`
    );
    return response.k8s_addons;
  }

  /**
   * Получает список установленных в кластере дополнений
   */
  async listInstalledAddons(clusterId: number): Promise<K8sAddon[]> {
    const response = await this.get<ListK8sAddonsResponseDto>(
      `/api/v1/k8s/clusters/${clusterId}/addons`
    );
    return response.addons;
  }

  /**
   * Устанавливает дополнение в кластере
   */
  async installAddon(
    clusterId: number,
    data: InstallK8sAddonRequestDto
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/k8s/clusters/${clusterId}/addons`,
      data
    );
  }

  /**
   * Изменяет конфигурацию установленного дополнения
   */
  async updateAddon(
    clusterId: number,
    addonId: number,
    data: InstallK8sAddonRequestDto
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/k8s/clusters/${clusterId}/addons/${addonId}`,
      data
    );
  }

  /**
   * Удаляет установленное дополнение
   */
  async uninstallAddon(clusterId: number, addonId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/k8s/clusters/${clusterId}/addons/${addonId}`
    );
  }
}

export const kubernetesApiClient: KubernetesApiClient =
  new KubernetesApiClient();
