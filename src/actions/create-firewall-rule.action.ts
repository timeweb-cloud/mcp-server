import { firewallApiClient } from "../api";
import { CreateFirewallRuleRequestDto } from "../types/dto/create-firewall-rule-request.dto";
import { FirewallRule } from "../types/firewall-rule.type";

export const createFirewallRuleAction = async (
  groupId: string,
  data: CreateFirewallRuleRequestDto
): Promise<FirewallRule> => {
  return await firewallApiClient.createFirewallRule(groupId, data);
};
