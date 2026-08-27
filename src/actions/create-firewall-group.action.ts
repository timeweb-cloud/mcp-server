import { firewallApiClient } from "../api";
import {
  FirewallGroup,
  FirewallPolicy,
} from "../types/firewall-group.type";

export const createFirewallGroupAction = async (
  name: string,
  description?: string,
  policy?: FirewallPolicy
): Promise<FirewallGroup> => {
  return await firewallApiClient.createFirewallGroup(
    { name, description },
    policy
  );
};
