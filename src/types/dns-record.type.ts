export type DnsRecordType = "TXT" | "SRV" | "CNAME" | "AAAA" | "MX" | "A";

export type DnsRecordData = {
  priority?: number;
  subdomain?: string | null;
  value?: string;
  host?: string;
  port?: number;
  service?: string;
  protocol?: string;
  [key: string]: unknown;
};

export type DnsRecord = {
  type: DnsRecordType;
  id?: number | null;
  data: DnsRecordData;
  ttl?: number;
  [key: string]: unknown;
};

export type DnsRecordV2 = {
  type: DnsRecordType;
  id?: number | null;
  fqdn?: string;
  data: DnsRecordData;
  ttl?: number;
  [key: string]: unknown;
};
