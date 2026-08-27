import { domainsApiClient } from "../api";
import { TopLevelDomain } from "../types/top-level-domain.type";

export const listTldsAction = async (): Promise<TopLevelDomain[]> => {
  return await domainsApiClient.listTlds();
};

export const getTldAction = async (tldId: number): Promise<TopLevelDomain> => {
  return await domainsApiClient.getTld(tldId);
};
