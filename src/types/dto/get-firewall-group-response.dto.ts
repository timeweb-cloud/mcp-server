import { FirewallGroup } from "../firewall-group.type";

export interface GetFirewallGroupResponseDto {
  group: FirewallGroup;
  response_id?: string;
}
