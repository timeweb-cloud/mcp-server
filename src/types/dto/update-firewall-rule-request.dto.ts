import {
  FirewallRuleDirection,
  FirewallRuleProtocol,
} from "../firewall-rule.type";

export interface UpdateFirewallRuleRequestDto {
  direction: FirewallRuleDirection;
  protocol: FirewallRuleProtocol;
  description?: string;
  port?: string;
  cidr?: string;
}
