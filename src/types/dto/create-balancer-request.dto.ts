import { BalancerAlgo, BalancerProto } from "../balancer.type";

export type CreateBalancerCertificate = {
  type: "lets_encrypt" | "custom";
  fqdn?: string;
  cert_data?: string;
  key_data?: string;
};

export type CreateBalancerNetwork = {
  id: string;
  floating_ip?: string;
  local_ip?: string;
};

export type CreateBalancerRequestDto = {
  name: string;
  algo: BalancerAlgo;
  is_sticky: boolean;
  is_use_proxy: boolean;
  is_ssl: boolean;
  is_keepalive: boolean;
  proto: BalancerProto;
  port?: number;
  path: string;
  inter: number;
  timeout: number;
  fall: number;
  rise: number;
  maxconn?: number;
  connect_timeout?: number;
  client_timeout?: number;
  server_timeout?: number;
  httprequest_timeout?: number;
  preset_id: number;
  network?: CreateBalancerNetwork;
  availability_zone?: string;
  project_id?: number;
  certificates?: CreateBalancerCertificate;
};
