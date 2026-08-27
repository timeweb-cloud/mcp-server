import { DatabaseInstanceEntity } from "../database-cluster.type";

export type ListDatabaseInstancesResponseDto = {
  meta: { total: number };
  instances: DatabaseInstanceEntity[];
};
