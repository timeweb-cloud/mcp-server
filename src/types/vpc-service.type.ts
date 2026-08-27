export type VpcServiceType = "server" | "balancer" | "dbaas";

export interface VpcService {
  id: number;
  name: string;
  public_ip?: string;
  local_ip?: string;
  type: VpcServiceType;
}
