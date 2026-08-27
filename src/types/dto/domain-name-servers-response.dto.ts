import { DomainNameServer } from "../domain-name-server.type";

export type DomainNameServersResponseDto = {
  name_servers: DomainNameServer[];
  meta: { total: number };
};
