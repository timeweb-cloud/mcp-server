import { DedicatedServer } from "../dedicated-server.type";

export type ListDedicatedServersResponseDto = {
  meta: { total: number };
  dedicated_servers: DedicatedServer[];
};
