export type FirewallPolicy = "ACCEPT" | "DROP";

export type FirewallGroup = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  policy: FirewallPolicy;
};
