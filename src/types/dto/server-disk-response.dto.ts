import { ServerDisk } from "../server-disk.type";

export type ServerDiskResponseDto = {
  server_disk: ServerDisk;
  response_id?: string;
};
