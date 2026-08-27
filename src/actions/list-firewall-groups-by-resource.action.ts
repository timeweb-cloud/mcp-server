import { firewallApiClient } from "../api";
import { FirewallGroup } from "../types/firewall-group.type";
import { FirewallResourceType } from "../types/firewall-resource.type";

export const listFirewallGroupsByResourceAction = async (
  resourceType: FirewallResourceType,
  resourceId: string
): Promise<FirewallGroup[]> => {
  return await firewallApiClient.listFirewallGroupsByResource(
    resourceType,
    resourceId
  );
};
