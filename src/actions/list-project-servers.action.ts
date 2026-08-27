import { projectsApiClient } from "../api/projects";

export const listProjectServersAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectServers(projectId);
};
