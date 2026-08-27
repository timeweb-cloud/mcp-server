import { DnsRecord } from "../dns-record.type";

export type ListDnsRecordsResponseDto = {
  dns_records: DnsRecord[];
  meta: { total: number };
};
