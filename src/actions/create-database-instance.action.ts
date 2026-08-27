import { dbaasApiClient } from "../api";
import { DatabaseInstanceEntity } from "../types/database-cluster.type";
import { CreateDatabaseInstanceRequestDto } from "../types/dto/create-database-instance-request.dto";

export const createDatabaseInstanceAction = async (
  clusterId: number,
  data: CreateDatabaseInstanceRequestDto
): Promise<DatabaseInstanceEntity | null> => {
  return await dbaasApiClient.createDatabaseInstance(clusterId, data);
};
