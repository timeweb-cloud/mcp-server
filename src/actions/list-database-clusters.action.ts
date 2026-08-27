import { dbaasApiClient } from "../api";
import { DatabaseCluster } from "../types/database-cluster.type";

export const listDatabaseClustersAction = async (
  limit?: number,
  offset?: number
): Promise<DatabaseCluster[]> => {
  return await dbaasApiClient.listDatabaseClusters(limit, offset);
};
