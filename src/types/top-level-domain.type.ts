export type TldAllowedBuyPeriod = {
  period: string;
  price: number;
};

export type TopLevelDomain = {
  id: number;
  name: string;
  price: number;
  prolong_price?: number;
  registrar?: string;
  grace_period?: number;
  early_renew_period?: number | null;
  is_published?: boolean;
  is_registered?: boolean;
  is_whois_privacy_default_enabled?: boolean;
  is_whois_privacy_enabled?: boolean;
  allowed_buy_periods?: TldAllowedBuyPeriod[];
  [key: string]: unknown;
};
