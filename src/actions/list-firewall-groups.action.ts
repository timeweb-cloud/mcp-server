import { firewallApiClient } from "../api";
import { FirewallGroup } from "../types/firewall-group.type";

export const listFirewallGroupsAction = async (): Promise<FirewallGroup[]> => {
  return await firewallApiClient.listFirewallGroups();
};
