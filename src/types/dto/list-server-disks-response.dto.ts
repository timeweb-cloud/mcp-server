import { ServerDisk } from "../server-disk.type";

export type ListServerDisksResponseDto = {
  server_disks: ServerDisk[];
  meta: { total: number };
};
