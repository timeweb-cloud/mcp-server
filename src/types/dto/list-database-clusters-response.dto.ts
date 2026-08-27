import { DatabaseCluster } from "../database-cluster.type";

export type ListDatabaseClustersResponseDto = {
  meta: { total: number };
  dbs: DatabaseCluster[];
};
