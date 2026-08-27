import { domainsApiClient } from "../api";
import { DomainNameServer } from "../types/domain-name-server.type";

export const getDomainNameServersAction = async (
  fqdn: string
): Promise<DomainNameServer[]> => {
  return await domainsApiClient.getNameServers(fqdn);
};
