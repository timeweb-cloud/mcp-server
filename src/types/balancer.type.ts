export type BalancerProto = "http" | "http2" | "https" | "tcp";
export type BalancerAlgo = "roundrobin" | "leastconn";
export type BalancerStatus = "started" | "stoped" | "starting" | "no_paid";

export type BalancerRule = {
  id: number;
  balancer_proto: BalancerProto;
  balancer_port: number;
  server_proto: BalancerProto;
  server_port: number;
};

export type BalancerNetwork = {
  id?: string;
  type: "public" | "local";
  nat_mode?: "dnat_and_snat" | "snat" | "no_nat";
  port_id?: string;
  ips:
    | {
        type: "ipv4" | "ipv6";
        ip: string;
      }[]
    | null;
};

export type Balancer = {
  id: number;
  account_id?: string;
  algo: BalancerAlgo;
  created_at: string;
  fall: number;
  inter: number;
  ip: string | null;
  local_ip: string | null;
  is_keepalive: boolean;
  name: string;
  path: string;
  port: number;
  proto: BalancerProto;
  rise: number;
  maxconn: number;
  connect_timeout: number;
  client_timeout: number;
  server_timeout: number;
  httprequest_timeout: number;
  preset_id: number;
  is_ssl: boolean;
  status: BalancerStatus;
  is_sticky: boolean;
  timeout: number;
  avatar_link: string | null;
  is_use_proxy: boolean;
  rules: BalancerRule[];
  ips: string[];
  location: string;
  availability_zone: string;
  project_id: number;
  networks: BalancerNetwork[];
};

export type BalancerPreset = {
  id: number;
  description: string;
  description_short: string;
  bandwidth: number;
  replica_count: number;
  request_per_second: string;
  price: number;
  location: string;
};

export type DeleteBalancerResult = {
  hash?: string;
  is_moved_in_quarantine?: boolean;
};
