export type BatchMailboxV1Item = {
  login: string;
  password: string;
  owner_full_name?: string;
  comment?: string;
};

export type BatchCreateMailboxesV1RequestDto = {
  mailboxes: BatchMailboxV1Item[];
};

export type BatchMailboxV2Item = {
  login: string;
  password: string;
  owner_full_name?: string;
  comment?: string;
  filter_status?: boolean;
  filter_action?: "directory" | "label";
};

// v2 body — массив напрямую (не объект)
export type BatchCreateMailboxesV2RequestDto = BatchMailboxV2Item[];
