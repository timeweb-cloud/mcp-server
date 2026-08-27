import { dbaasApiClient } from "../api";
import { DatabaseType } from "../types/database-cluster.type";

export const listDatabaseTypesAction = async (): Promise<DatabaseType[]> => {
  return await dbaasApiClient.listDatabaseTypes();
};
