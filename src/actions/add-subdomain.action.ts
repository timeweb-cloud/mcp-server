import { domainsApiClient } from "../api";
import { DomainSubdomain } from "../types/domain.type";

export const addSubdomainAction = async (
  fqdn: string,
  subdomainFqdn: string
): Promise<DomainSubdomain> => {
  return await domainsApiClient.addSubdomain(fqdn, subdomainFqdn);
};
