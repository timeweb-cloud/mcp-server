import { mailApiClient } from "../api";
import { MailDomainInfo } from "../types/mailbox.type";

export const getMailDomainInfoAction = async (
  domain: string
): Promise<MailDomainInfo> => {
  return await mailApiClient.getMailDomainInfo(domain);
};
