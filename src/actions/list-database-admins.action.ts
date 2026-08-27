import { dbaasApiClient } from "../api";
import { DatabaseAdminEntity } from "../types/database-cluster.type";

export const listDatabaseAdminsAction = async (
  clusterId: number
): Promise<DatabaseAdminEntity[]> => {
  return await dbaasApiClient.listDatabaseAdmins(clusterId);
};
