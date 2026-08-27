import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";

export const getMailboxV1Action = async (
  domain: string,
  mailbox: string
): Promise<Mailbox> => {
  return await mailApiClient.getMailboxV1(domain, mailbox);
};
