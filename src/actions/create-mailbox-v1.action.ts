import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";
import { CreateMailboxV1RequestDto } from "../types/dto/create-mailbox-request.dto";

export const createMailboxV1Action = async (
  domain: string,
  data: CreateMailboxV1RequestDto
): Promise<Mailbox> => {
  return await mailApiClient.createMailboxV1(domain, data);
};
