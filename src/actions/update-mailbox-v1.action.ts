import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";
import { UpdateMailboxV1RequestDto } from "../types/dto/update-mailbox-request.dto";

export const updateMailboxV1Action = async (
  domain: string,
  mailbox: string,
  data: UpdateMailboxV1RequestDto
): Promise<Mailbox> => {
  return await mailApiClient.updateMailboxV1(domain, mailbox, data);
};
