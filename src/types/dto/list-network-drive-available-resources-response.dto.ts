import { NetworkDriveAvailableResource } from "../network-drive-available-resource.type";

export type ListNetworkDriveAvailableResourcesResponseDto = {
  meta: any;
  available_resources: NetworkDriveAvailableResource[];
  response_id?: string;
};
