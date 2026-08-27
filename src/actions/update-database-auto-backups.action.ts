import { dbaasApiClient } from "../api";
import { DatabaseAutoBackupSettings } from "../types/database-cluster.type";
import { UpdateDatabaseAutoBackupsRequestDto } from "../types/dto/update-database-auto-backups-request.dto";

export const updateDatabaseAutoBackupsAction = async (
  dbId: number,
  data: UpdateDatabaseAutoBackupsRequestDto
): Promise<DatabaseAutoBackupSettings[]> => {
  return await dbaasApiClient.updateDatabaseAutoBackups(dbId, data);
};
