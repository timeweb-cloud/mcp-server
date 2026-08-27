import { dbaasApiClient } from "../api";
import { DeleteDatabaseResponseDto } from "../types/dto/delete-database-response.dto";

export const deleteDatabaseAction = async (
  dbId: number,
  hash?: string,
  code?: string
): Promise<DeleteDatabaseResponseDto> => {
  return await dbaasApiClient.deleteDatabase(dbId, hash, code);
};
