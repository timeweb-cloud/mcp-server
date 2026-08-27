import { dbaasApiClient } from "../api";
import { Database } from "../types/database.type";

export const getDatabaseAction = async (dbId: number): Promise<Database> => {
  return await dbaasApiClient.getDatabase(dbId);
};
