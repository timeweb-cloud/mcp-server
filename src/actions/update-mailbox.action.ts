import { mailApiClient } from "../api";
import { UpdateMailboxV2RequestDto } from "../types/dto/update-mailbox-request.dto";

export const updateMailboxAction = async (
  domain: string,
  mailbox: string,
  data: UpdateMailboxV2RequestDto
): Promise<Record<string, any>> => {
  return await mailApiClient.updateMailboxV2(domain, mailbox, data);
};
