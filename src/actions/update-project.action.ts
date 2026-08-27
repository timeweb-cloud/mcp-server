import { projectsApiClient } from "../api/projects";
import { Project } from "../types/project.type";
import { UpdateProjectRequestDto } from "../types/dto/update-project-request.dto";

export const updateProjectAction = async (
  projectId: number,
  data: UpdateProjectRequestDto
): Promise<Project> => {
  return await projectsApiClient.updateProject(projectId, data);
};
