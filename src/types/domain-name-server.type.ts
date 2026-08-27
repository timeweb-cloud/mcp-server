export type DomainNameServerItem = {
  host: string;
  ips: string[];
};

export type DomainNameServer = {
  is_delegation_allowed: boolean;
  task_status: "done" | "active" | "failed" | string;
  items: DomainNameServerItem[];
};
