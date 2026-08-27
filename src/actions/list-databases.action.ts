import { dbaasApiClient } from "../api";
import { Database } from "../types/database.type";

export const listDatabasesAction = async (
  limit?: number,
  offset?: number
): Promise<Database[]> => {
  return await dbaasApiClient.listDatabases(limit, offset);
};
