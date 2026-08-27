import { DnsRecordType } from "../dns-record.type";

export type CreateDnsRecordRequestDto = {
  type: DnsRecordType;
  value: string;
  priority?: number;
  subdomain?: string;
  ttl?: number;
};

export type CreateDnsRecordV2RequestDto = {
  type: DnsRecordType;
  value?: string;
  ttl?: number;
  app_id?: number;
  subdomain?: string;
  priority?: number;
  host?: string;
  port?: number;
  service?: string;
  protocol?: string;
  [key: string]: unknown;
};
