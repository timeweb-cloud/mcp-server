import { dbaasApiClient } from "../api";
import { DatabaseInstanceEntity } from "../types/database-cluster.type";

export const listDatabaseInstancesAction = async (
  clusterId: number
): Promise<DatabaseInstanceEntity[]> => {
  return await dbaasApiClient.listDatabaseInstances(clusterId);
};
