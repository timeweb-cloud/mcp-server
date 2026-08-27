import { s3BucketsApiClient } from "../api";
import { BucketTransferStatus } from "../types/bucket-transfer-status.type";

export const getBucketTransferStatusAction = async (
  bucketId: number
): Promise<BucketTransferStatus> => {
  return await s3BucketsApiClient.getBucketTransferStatus(bucketId);
};
