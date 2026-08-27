import { firewallApiClient } from "../api";
import {
  FirewallGroupResource,
  FirewallResourceType,
} from "../types/firewall-resource.type";

export const linkFirewallResourceAction = async (
  groupId: string,
  resourceId: string,
  resourceType: FirewallResourceType = "server"
): Promise<FirewallGroupResource> => {
  return await firewallApiClient.linkFirewallResource(
    groupId,
    resourceId,
    resourceType
  );
};
