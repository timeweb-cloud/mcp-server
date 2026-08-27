import { projectsApiClient } from "../api/projects";

export const listProjectBalancersAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectBalancers(projectId);
};
