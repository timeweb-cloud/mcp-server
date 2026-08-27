export type DomainAllowedBuyPeriod = {
  period: string;
  price: number;
};

export type DomainLinkedIp = {
  ip?: string | null;
  service_type?: string | null;
  resource_id?: number | string | null;
  [key: string]: unknown;
};

export type Domain = {
  id: number;
  fqdn: string;
  domain_status: string;
  expiration: string;
  days_left?: number;
  avatar_link?: string | null;
  is_autoprolong_enabled?: boolean | null;
  is_premium?: boolean;
  is_prolong_allowed?: boolean;
  is_technical?: boolean;
  is_whois_privacy_enabled?: boolean;
  linked_ip?: string | DomainLinkedIp | null;
  person_id?: number | null;
  provider?: string | null;
  registrar?: string | null;
  subdomains?: DomainSubdomain[];
  allowed_buy_periods?: DomainAllowedBuyPeriod[];
  [key: string]: unknown;
};

export type DomainSubdomain = {
  id: number;
  fqdn: string;
  linked_ip?: string | null;
  [key: string]: unknown;
};
