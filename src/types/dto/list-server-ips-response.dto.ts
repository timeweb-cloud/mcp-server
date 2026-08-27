import { ServerIp } from "../server-ip.type";

export type ListServerIpsResponseDto = {
  meta: { total: number };
  server_ips: ServerIp[];
  response_id?: string;
};
