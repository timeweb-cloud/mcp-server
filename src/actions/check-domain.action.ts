import { domainsApiClient } from "../api";

export const checkDomainAction = async (fqdn: string): Promise<boolean> => {
  return await domainsApiClient.checkDomain(fqdn);
};
