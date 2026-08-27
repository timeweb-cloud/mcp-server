import { projectsApiClient } from "../api/projects";

export const deleteProjectAction = async (projectId: number): Promise<void> => {
  await projectsApiClient.deleteProject(projectId);
};
