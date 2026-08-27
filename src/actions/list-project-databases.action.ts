import { projectsApiClient } from "../api/projects";

export const listProjectDatabasesAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectDatabases(projectId);
};
