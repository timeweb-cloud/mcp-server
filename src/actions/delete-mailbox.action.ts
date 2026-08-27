import { mailApiClient } from "../api";

export const deleteMailboxAction = async (
  domain: string,
  mailbox: string
): Promise<void> => {
  return await mailApiClient.deleteMailbox(domain, mailbox);
};
