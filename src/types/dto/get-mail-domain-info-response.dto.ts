import { MailDomainInfo } from "../mailbox.type";

export type GetMailDomainInfoResponseDto = {
  domain_info: MailDomainInfo;
  response_id?: string;
};
