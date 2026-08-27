import { dbaasApiClient } from "../api";
import { DatabaseAdminEntity } from "../types/database-cluster.type";

export const getDatabaseAdminAction = async (
  clusterId: number,
  adminId: number
): Promise<DatabaseAdminEntity> => {
  return await dbaasApiClient.getDatabaseAdmin(clusterId, adminId);
};
