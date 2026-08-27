import { projectsApiClient } from "../api/projects";

export const listAllProjectClustersAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceClusters();
};
