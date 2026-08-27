import { domainsApiClient } from "../api";

export const deleteDomainAction = async (fqdn: string): Promise<void> => {
  await domainsApiClient.deleteDomain(fqdn);
};
