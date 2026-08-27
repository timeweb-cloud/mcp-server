import { ProjectResourceTypeEnum } from "../project-resource-type.enum";

export type TransferProjectResourceRequestDto = {
  to_project: number;
  resource_id: number;
  resource_type: ProjectResourceTypeEnum;
};
