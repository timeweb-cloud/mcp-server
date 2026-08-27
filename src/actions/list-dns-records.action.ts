import { domainsApiClient } from "../api";
import { DnsRecord } from "../types/dns-record.type";

export const listDnsRecordsAction = async (
  fqdn: string
): Promise<DnsRecord[]> => {
  return await domainsApiClient.listDnsRecords(fqdn);
};

export const listDefaultDnsRecordsAction = async (
  fqdn: string
): Promise<DnsRecord[]> => {
  return await domainsApiClient.listDefaultDnsRecords(fqdn);
};
