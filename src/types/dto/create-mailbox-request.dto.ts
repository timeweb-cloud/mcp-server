export type CreateMailboxV1RequestDto = {
  mailbox: string;
  password: string;
  comment?: string;
};

export type CreateMailboxV2RequestDto = {
  mailbox: string;
  password: string;
  comment?: string;
  owner_full_name?: string;
  filter_status?: boolean;
  filter_action?: "directory" | "label";
};
