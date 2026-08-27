import { ServerLog } from "../server-log.type";

export type GetServerLogsResponseDto = {
  server_logs: ServerLog[];
  meta: { total: number };
};
