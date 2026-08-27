export type FirewallRuleDirection = "ingress" | "egress";

export type FirewallRuleProtocol = "tcp" | "udp" | "icmp";

export type FirewallRule = {
  id: string;
  description: string;
  direction: FirewallRuleDirection;
  protocol: FirewallRuleProtocol;
  port?: string;
  cidr?: string;
  group_id: string;
};
