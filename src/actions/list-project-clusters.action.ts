import { projectsApiClient } from "../api/projects";

export const listProjectClustersAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectClusters(projectId);
};
