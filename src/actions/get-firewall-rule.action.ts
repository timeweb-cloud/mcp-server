import { firewallApiClient } from "../api";
import { FirewallRule } from "../types/firewall-rule.type";

export const getFirewallRuleAction = async (
  groupId: string,
  ruleId: string
): Promise<FirewallRule> => {
  return await firewallApiClient.getFirewallRule(groupId, ruleId);
};
