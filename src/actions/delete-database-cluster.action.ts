import { dbaasApiClient } from "../api";
import { DeleteDatabaseClusterResponseDto } from "../types/dto/delete-database-response.dto";

export const deleteDatabaseClusterAction = async (
  clusterId: number,
  hash?: string,
  code?: string
): Promise<DeleteDatabaseClusterResponseDto> => {
  return await dbaasApiClient.deleteDatabaseCluster(clusterId, hash, code);
};
