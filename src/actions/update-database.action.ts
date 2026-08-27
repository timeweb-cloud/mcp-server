import { dbaasApiClient } from "../api";
import { Database } from "../types/database.type";
import { UpdateDatabaseRequestDto } from "../types/dto/update-database-request.dto";

export const updateDatabaseAction = async (
  dbId: number,
  data: UpdateDatabaseRequestDto
): Promise<Database> => {
  return await dbaasApiClient.updateDatabase(dbId, data);
};
