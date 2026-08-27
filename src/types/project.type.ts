export type Project = {
  id: number;
  account_id: string;
  avatar_id: string | null;
  description: string;
  name: string;
  is_default: boolean;
};

export type ProjectResourceType =
  | "server"
  | "balancer"
  | "database"
  | "kubernetes"
  | "storage"
  | "dedicated";

export type ProjectResource = {
  id: number;
  created_at: string;
  resource_id: number;
  project: Project;
  type: ProjectResourceType;
};
