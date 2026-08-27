import { domainsApiClient } from "../api";
import { Domain } from "../types/domain.type";

export const listDomainsAction = async (): Promise<Domain[]> => {
  return await domainsApiClient.listDomains();
};
