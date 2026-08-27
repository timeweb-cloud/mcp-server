import { BucketTransferStatus } from "../bucket-transfer-status.type";

export type GetBucketTransferStatusResponseDto = {
  transfer_status: BucketTransferStatus;
  response_id?: string;
};
