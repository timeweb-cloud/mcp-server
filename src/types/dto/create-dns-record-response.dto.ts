import { DnsRecord, DnsRecordV2 } from "../dns-record.type";

export type CreateDnsRecordResponseDto = {
  dns_record: DnsRecord;
};

export type CreateDnsRecordV2ResponseDto = {
  dns_record: DnsRecordV2;
};
