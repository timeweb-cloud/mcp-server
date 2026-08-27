import { domainsApiClient } from "../api";

export const deleteDnsRecordAction = async (
  fqdn: string,
  recordId: number
): Promise<void> => {
  await domainsApiClient.deleteDnsRecord(fqdn, recordId);
};
