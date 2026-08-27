import { FirewallGroup } from "../firewall-group.type";

export interface ListFirewallGroupsResponseDto {
  groups: FirewallGroup[];
  meta: {
    total: number;
  };
  response_id?: string;
}
