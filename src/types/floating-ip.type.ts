import { AvailabilityZones } from "./availability-zones.enum";

export type FloatingIpResourceType = "server" | "balancer" | "database" | "network";

export interface FloatingIp {
  id: string;
  ip: string | null;
  is_ddos_guard: boolean;
  availability_zone: AvailabilityZones;
  resource_type?: FloatingIpResourceType | null;
  resource_id?: number | string | null;
  comment: string | null;
  ptr?: string | null;
  created_at?: string;
}
