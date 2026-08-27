import { FirewallRule } from "../firewall-rule.type";

export interface GetFirewallRuleResponseDto {
  rule: FirewallRule;
  response_id?: string;
}
