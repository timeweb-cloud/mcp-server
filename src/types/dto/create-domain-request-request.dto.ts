export type DomainRegisterRequest = {
  action: "register";
  fqdn: string;
  person_id: number;
  is_autoprolong_enabled?: boolean;
  is_whois_privacy_enabled?: boolean;
  period?: string;
};

export type DomainProlongRequest = {
  action: "prolong";
  fqdn: string;
  person_id?: number;
  is_antispam_enabled?: boolean;
  is_autoprolong_enabled?: boolean;
  is_whois_privacy_enabled?: boolean;
  period?: string;
  prime?: string;
};

export type DomainTransferRequest = {
  action: "transfer";
  fqdn: string;
  auth_code: string;
};

export type CreateDomainRequestRequestDto =
  | DomainRegisterRequest
  | DomainProlongRequest
  | DomainTransferRequest;

export type UpdateDomainRequestBodyDto =
  | { money_source: "use"; person_id?: number }
  | {
      money_source: "invoice";
      payment_type: string;
      payer_id: number;
      person_id?: number;
    }
  | { money_source: "free"; auth_code: string; person_id?: number }
  | { money_source: "bonus"; bonus_id: number; person_id?: number };
