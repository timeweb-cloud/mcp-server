import { domainsApiClient } from "../api";

export const deleteSubdomainAction = async (
  fqdn: string,
  subdomainFqdn: string
): Promise<void> => {
  await domainsApiClient.deleteSubdomain(fqdn, subdomainFqdn);
};
