import { DatabaseDeleteResponse } from "../database-cluster.type";

export type DeleteDatabaseClusterResponseDto = {
  hash?: string;
};

export type DeleteDatabaseResponseDto = {
  database_delete?: DatabaseDeleteResponse;
};
