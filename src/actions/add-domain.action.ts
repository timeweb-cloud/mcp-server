import { domainsApiClient } from "../api";

export const addDomainAction = async (fqdn: string): Promise<void> => {
  await domainsApiClient.addDomain(fqdn);
};
