export type K8sNodeGroupConfiguration = {
  configurator_id: number;
  disk: number;
  cpu: number;
  ram: number;
  gpu?: number;
};

export type CreateK8sNodeGroupRequestDto = {
  name: string;
  node_count: number;
  preset_id?: number;
  configuration?: K8sNodeGroupConfiguration;
  labels?: Array<{ key: string; value: string }>;
  is_autoscaling?: boolean;
  "min-size"?: number;
  "max-size"?: number;
  is_autohealing?: boolean;
};
