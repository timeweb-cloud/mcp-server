import { BalancerAlgo, BalancerProto } from "../balancer.type";
import { CreateBalancerCertificate } from "./create-balancer-request.dto";

export type UpdateBalancerRequestDto = {
  name?: string;
  algo?: BalancerAlgo;
  is_sticky?: boolean;
  is_use_proxy?: boolean;
  is_ssl?: boolean;
  is_keepalive?: boolean;
  proto?: BalancerProto;
  port?: number;
  path?: string;
  inter?: number;
  timeout?: number;
  fall?: number;
  rise?: number;
  maxconn?: number;
  connect_timeout?: number;
  client_timeout?: number;
  server_timeout?: number;
  httprequest_timeout?: number;
  comment?: string;
  certificates?: CreateBalancerCertificate;
};
