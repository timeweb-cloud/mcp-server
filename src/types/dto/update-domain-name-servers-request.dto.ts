export type NameServerInput = {
  host: string;
  ips?: string[];
};

export type UpdateDomainNameServersRequestDto = {
  name_servers: NameServerInput[];
};
