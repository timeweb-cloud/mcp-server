export type K8sResource = {
  requested: number;
  allocatable: number;
  capacity: number;
  used: number;
};

export type K8sResources = {
  nodes: number;
  cores: K8sResource;
  memory: K8sResource;
  pods: K8sResource;
};
