import { firewallApiClient } from "../api";
import { FirewallGroup } from "../types/firewall-group.type";

export const updateFirewallGroupAction = async (
  groupId: string,
  name: string,
  description?: string
): Promise<FirewallGroup> => {
  return await firewallApiClient.updateFirewallGroup(groupId, {
    name,
    description,
  });
};
