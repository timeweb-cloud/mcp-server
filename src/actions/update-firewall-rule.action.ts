import { firewallApiClient } from "../api";
import { UpdateFirewallRuleRequestDto } from "../types/dto/update-firewall-rule-request.dto";
import { FirewallRule } from "../types/firewall-rule.type";

export const updateFirewallRuleAction = async (
  groupId: string,
  ruleId: string,
  data: UpdateFirewallRuleRequestDto
): Promise<FirewallRule> => {
  return await firewallApiClient.updateFirewallRule(groupId, ruleId, data);
};
