import { firewallApiClient } from "../api";
import { FirewallGroupResource } from "../types/firewall-resource.type";

export const listFirewallGroupResourcesAction = async (
  groupId: string
): Promise<FirewallGroupResource[]> => {
  return await firewallApiClient.listFirewallGroupResources(groupId);
};
