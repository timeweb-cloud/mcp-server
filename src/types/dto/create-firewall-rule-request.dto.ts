import {
  FirewallRuleDirection,
  FirewallRuleProtocol,
} from "../firewall-rule.type";

export interface CreateFirewallRuleRequestDto {
  direction: FirewallRuleDirection;
  protocol: FirewallRuleProtocol;
  description?: string;
  port?: string;
  cidr?: string;
}
