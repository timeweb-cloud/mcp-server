export type K8sNode = {
  id: number;
  created_at: string;
  type: string;
  group_id: number;
  status: string;
  preset_id: number;
  cpu: number;
  ram: number;
  disk: number;
  network: number;
  node_ip: string;
};
