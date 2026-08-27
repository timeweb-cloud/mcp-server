import { domainsApiClient } from "../api";
import { DomainNameServer } from "../types/domain-name-server.type";
import { UpdateDomainNameServersRequestDto } from "../types/dto/update-domain-name-servers-request.dto";

export const updateDomainNameServersAction = async (
  fqdn: string,
  data: UpdateDomainNameServersRequestDto
): Promise<DomainNameServer[]> => {
  return await domainsApiClient.updateNameServers(fqdn, data);
};
