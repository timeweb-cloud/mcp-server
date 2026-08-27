import { Database } from "../database.type";

export type ListDatabasesResponseDto = {
  meta: { total: number };
  dbs: Database[];
};
