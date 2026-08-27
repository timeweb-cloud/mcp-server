import { DatabaseAdminEntity } from "../database-cluster.type";

export type ListDatabaseAdminsResponseDto = {
  meta: { total: number };
  admins: DatabaseAdminEntity[];
};
