import { dbaasApiClient } from "../api";
import { DatabaseCluster } from "../types/database-cluster.type";
import { UpdateDatabaseClusterRequestDto } from "../types/dto/update-database-cluster-request.dto";

export const updateDatabaseClusterAction = async (
  clusterId: number,
  data: UpdateDatabaseClusterRequestDto
): Promise<DatabaseCluster> => {
  return await dbaasApiClient.updateDatabaseCluster(clusterId, data);
};
