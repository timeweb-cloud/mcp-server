export type K8sClusterConfiguration = {
  configurator_id: number;
  disk: number;
  cpu: number;
  ram: number;
};

export type K8sMaintenanceSlot = {
  type: "any_time" | "fixed_time";
  from?: string;
  to?: string;
};

export type K8sOidcProvider = {
  name: string;
  issuer_url: string;
  client_id: string;
  username_claim?: string;
  groups_claim?: string;
};

export type K8sClusterNetworkCidr = {
  pods_network?: string;
  services_network?: string;
};

export type K8sWorkerGroupIn = {
  name: string;
  node_count: number;
  preset_id?: number;
  configuration?: K8sClusterConfiguration & { gpu?: number };
  labels?: Array<{ key: string; value: string }>;
  is_autoscaling?: boolean;
  "min-size"?: number;
  "max-size"?: number;
  is_autohealing?: boolean;
};

export type CreateK8sClusterRequestDto = {
  name: string;
  k8s_version: string;
  network_driver: "kuberouter" | "calico" | "flannel" | "cilium";
  description?: string;
  availability_zone?: "spb-3" | "msk-1" | "ams-1" | "fra-1";
  is_ingress?: boolean;
  is_k8s_dashboard?: boolean;
  preset_id?: number;
  configuration?: K8sClusterConfiguration;
  master_nodes_count?: number;
  worker_groups?: K8sWorkerGroupIn[];
  network_id?: string;
  project_id?: number;
  maintenance_slot?: K8sMaintenanceSlot;
  oidc_provider?: K8sOidcProvider;
  cluster_network_cidr?: K8sClusterNetworkCidr;
};
