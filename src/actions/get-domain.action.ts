import { domainsApiClient } from "../api";
import { Domain } from "../types/domain.type";

export const getDomainAction = async (fqdn: string): Promise<Domain> => {
  return await domainsApiClient.getDomain(fqdn);
};
