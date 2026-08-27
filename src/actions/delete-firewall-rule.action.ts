import { firewallApiClient } from "../api";

export const deleteFirewallRuleAction = async (
  groupId: string,
  ruleId: string
): Promise<void> => {
  await firewallApiClient.deleteFirewallRule(groupId, ruleId);
};
