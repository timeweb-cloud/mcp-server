import { firewallApiClient } from "../api";
import { FirewallRule } from "../types/firewall-rule.type";

export const listFirewallRulesAction = async (
  groupId: string
): Promise<FirewallRule[]> => {
  return await firewallApiClient.listFirewallRules(groupId);
};
