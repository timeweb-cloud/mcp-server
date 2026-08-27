import { projectsApiClient } from "../api/projects";
import { Project } from "../types/project.type";
import { CreateProjectRequestDto } from "../types/dto/create-project-request.dto";

export const createProjectAction = async (
  data: CreateProjectRequestDto
): Promise<Project> => {
  return await projectsApiClient.createProject(data);
};
