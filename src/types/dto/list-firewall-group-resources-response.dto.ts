import { FirewallGroupResource } from "../firewall-resource.type";

export interface ListFirewallGroupResourcesResponseDto {
  resources: FirewallGroupResource[];
  meta: {
    total: number;
  };
  response_id?: string;
}
