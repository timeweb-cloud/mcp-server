import { firewallApiClient } from "../api";
import { FirewallResourceType } from "../types/firewall-resource.type";

export const unlinkFirewallResourceAction = async (
  groupId: string,
  resourceId: string,
  resourceType: FirewallResourceType = "server"
): Promise<void> => {
  await firewallApiClient.unlinkFirewallResource(
    groupId,
    resourceId,
    resourceType
  );
};
