import { dbaasApiClient } from "../api";
import { DatabaseAdminEntity } from "../types/database-cluster.type";
import { CreateDatabaseAdminRequestDto } from "../types/dto/create-database-admin-request.dto";

export const createDatabaseAdminAction = async (
  clusterId: number,
  data: CreateDatabaseAdminRequestDto
): Promise<DatabaseAdminEntity | null> => {
  return await dbaasApiClient.createDatabaseAdmin(clusterId, data);
};
