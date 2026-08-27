export type InstallK8sAddonRequestDto = {
  type: string;
  config_type: "basic" | "custom";
  yaml_config: string;
  version: string;
};
