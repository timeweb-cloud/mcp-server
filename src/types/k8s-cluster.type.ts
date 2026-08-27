export type K8sCluster = {
  id: number;
  name: string;
  created_at: string;
  status: string;
  description: string;
  k8s_version: string;
  network_driver: string;
  ingress: boolean;
  preset_id: number;
  avatar_link: string | null;
  cpu?: number;
  ram?: number;
  disk?: number;
  availability_zone?: string;
  project_id?: number;
};
