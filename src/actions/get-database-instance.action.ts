import { dbaasApiClient } from "../api";
import { DatabaseInstanceEntity } from "../types/database-cluster.type";

export const getDatabaseInstanceAction = async (
  clusterId: number,
  instanceId: number
): Promise<DatabaseInstanceEntity> => {
  return await dbaasApiClient.getDatabaseInstance(clusterId, instanceId);
};
