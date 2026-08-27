import { Mailbox, MailboxV2 } from "../mailbox.type";

export type GetMailboxV1ResponseDto = {
  mailbox: Mailbox;
  response_id?: string;
};

export type GetMailboxV2ResponseDto = {
  mailbox: MailboxV2;
  response_id?: string;
};
