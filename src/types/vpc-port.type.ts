export type VpcPortNatMode = "dnat_and_snat" | "snat" | "no_nat";

export type VpcPortServiceType = "server" | "balancer" | "dbaas";

export interface VpcPortService {
  id: number;
  type: VpcPortServiceType;
  name: string;
}

export interface VpcPort {
  id: string;
  nat_mode: VpcPortNatMode;
  mac: string;
  ipv4: string;
  service: VpcPortService;
}
