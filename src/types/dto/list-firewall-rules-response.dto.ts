import { FirewallRule } from "../firewall-rule.type";

export interface ListFirewallRulesResponseDto {
  rules: FirewallRule[];
  meta: {
    total: number;
  };
  response_id?: string;
}
