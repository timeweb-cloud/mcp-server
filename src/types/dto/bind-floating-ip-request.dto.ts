import { FloatingIpResourceType } from "../floating-ip.type";

export interface BindFloatingIpRequestDto {
  resource_type: FloatingIpResourceType;
  resource_id: number | string;
}
