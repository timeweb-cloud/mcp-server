import { domainsApiClient } from "../api";
import { DnsRecord } from "../types/dns-record.type";

export const listDefaultDnsRecordsAction = async (
  fqdn: string
): Promise<DnsRecord[]> => {
  return await domainsApiClient.listDefaultDnsRecords(fqdn);
};
