import { DatabaseType } from "../database-cluster.type";

export type ListDatabaseTypesResponseDto = {
  meta: { total: number };
  types: DatabaseType[];
};
