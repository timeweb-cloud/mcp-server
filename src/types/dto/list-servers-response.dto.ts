import { Server } from "../server.type";

export type ListServersResponseDto = {
  servers: Server[];
  meta: { total: number };
};
