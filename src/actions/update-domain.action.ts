import { domainsApiClient } from "../api";
import { Domain } from "../types/domain.type";
import { UpdateDomainRequestDto } from "../types/dto/update-domain-request.dto";

export const updateDomainAction = async (
  fqdn: string,
  data: UpdateDomainRequestDto
): Promise<Domain> => {
  return await domainsApiClient.updateDomain(fqdn, data);
};
