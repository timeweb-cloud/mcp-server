export type K8sAddon = {
  id: number;
  type: string;
  status: string;
  created_at: string;
  version: string;
  config?: Record<string, any>;
  yaml_config: string;
  config_type: string;
};

export type K8sAddonConfig = {
  id: number;
  type: string;
  version: string;
  dependencies: string[];
  yaml_config: string;
};
