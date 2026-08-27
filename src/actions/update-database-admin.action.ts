import { dbaasApiClient } from "../api";
import { DatabaseAdminEntity } from "../types/database-cluster.type";
import { UpdateDatabaseAdminRequestDto } from "../types/dto/update-database-admin-request.dto";

export const updateDatabaseAdminAction = async (
  clusterId: number,
  adminId: number,
  data: UpdateDatabaseAdminRequestDto
): Promise<DatabaseAdminEntity> => {
  return await dbaasApiClient.updateDatabaseAdmin(clusterId, adminId, data);
};
