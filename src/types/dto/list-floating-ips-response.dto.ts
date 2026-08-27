import { FloatingIp } from "../floating-ip.type";

export interface ListFloatingIpsResponseDto {
  meta: {
    total: number;
  };
  ips: FloatingIp[];
}
