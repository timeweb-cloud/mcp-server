import { dbaasApiClient } from "../api";
import { DatabaseCluster } from "../types/database-cluster.type";

export const getDatabaseClusterAction = async (
  clusterId: number
): Promise<DatabaseCluster> => {
  return await dbaasApiClient.getDatabaseCluster(clusterId);
};
