import { domainsApiClient } from "../api";
import { DnsRecordV2 } from "../types/dns-record.type";
import { CreateDnsRecordV2RequestDto } from "../types/dto/create-dns-record-request.dto";

export const updateDnsRecordAction = async (
  fqdn: string,
  recordId: number,
  data: CreateDnsRecordV2RequestDto
): Promise<DnsRecordV2> => {
  return await domainsApiClient.updateDnsRecord(fqdn, recordId, data);
};
