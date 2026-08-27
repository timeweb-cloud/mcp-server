import { domainsApiClient } from "../api";
import { DnsRecordV2 } from "../types/dns-record.type";
import { CreateDnsRecordV2RequestDto } from "../types/dto/create-dns-record-request.dto";

export const createDnsRecordAction = async (
  fqdn: string,
  data: CreateDnsRecordV2RequestDto
): Promise<DnsRecordV2> => {
  return await domainsApiClient.createDnsRecord(fqdn, data);
};
