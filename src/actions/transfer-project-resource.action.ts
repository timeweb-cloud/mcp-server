import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";
import { ProjectResourceTypeEnum } from "../types/project-resource-type.enum";

export const transferProjectResourceAction = async (
  fromProjectId: number,
  toProjectId: number,
  resourceId: number,
  resourceType: ProjectResourceTypeEnum
): Promise<ProjectResource> => {
  return await projectsApiClient.transferProjectResource(
    fromProjectId,
    toProjectId,
    resourceId,
    resourceType
  );
};
