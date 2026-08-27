import { ServerOs } from "../server-os.type";

export type ListServerOsResponseDto = {
  servers_os: ServerOs[];
  meta: { total: number };
};
