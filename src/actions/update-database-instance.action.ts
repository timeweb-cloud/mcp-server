import { dbaasApiClient } from "../api";
import { DatabaseInstanceEntity } from "../types/database-cluster.type";
import { UpdateDatabaseInstanceRequestDto } from "../types/dto/update-database-instance-request.dto";

export const updateDatabaseInstanceAction = async (
  clusterId: number,
  instanceId: number,
  data: UpdateDatabaseInstanceRequestDto
): Promise<DatabaseInstanceEntity> => {
  return await dbaasApiClient.updateDatabaseInstance(
    clusterId,
    instanceId,
    data
  );
};
