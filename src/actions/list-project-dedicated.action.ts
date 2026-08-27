import { projectsApiClient } from "../api/projects";

export const listProjectDedicatedAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectDedicated(projectId);
};
