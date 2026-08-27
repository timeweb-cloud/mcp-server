import { projectsApiClient } from "../api/projects";

export const listAllProjectDatabasesAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceDatabases();
};
