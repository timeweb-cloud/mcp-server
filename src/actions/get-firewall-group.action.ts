import { firewallApiClient } from "../api";
import { FirewallGroup } from "../types/firewall-group.type";

export const getFirewallGroupAction = async (
  groupId: string
): Promise<FirewallGroup> => {
  return await firewallApiClient.getFirewallGroup(groupId);
};
