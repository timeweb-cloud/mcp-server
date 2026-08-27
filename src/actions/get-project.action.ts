import { projectsApiClient } from "../api/projects";
import { Project } from "../types/project.type";

export const getProjectAction = async (projectId: number): Promise<Project> => {
  return await projectsApiClient.getProject(projectId);
};
