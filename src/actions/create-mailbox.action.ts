import { mailApiClient } from "../api";
import { MailboxV2 } from "../types/mailbox.type";
import { CreateMailboxV2RequestDto } from "../types/dto/create-mailbox-request.dto";

export const createMailboxAction = async (
  domain: string,
  data: CreateMailboxV2RequestDto
): Promise<MailboxV2> => {
  return await mailApiClient.createMailboxV2(domain, data);
};
