import { ServerSoftware } from "../server-software.type";

export type ListServerSoftwareResponseDto = {
  servers_software: ServerSoftware[];
  meta: { total: number };
};
