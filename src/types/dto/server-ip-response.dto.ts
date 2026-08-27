import { ServerIp } from "../server-ip.type";

export type ServerIpResponseDto = {
  server_ip: ServerIp;
  response_id?: string;
};
