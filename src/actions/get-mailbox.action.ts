import { mailApiClient } from "../api";
import { MailboxV2 } from "../types/mailbox.type";

export const getMailboxAction = async (
  domain: string,
  mailbox: string
): Promise<MailboxV2> => {
  return await mailApiClient.getMailboxV2(domain, mailbox);
};
