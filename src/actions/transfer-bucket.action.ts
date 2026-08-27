import { s3BucketsApiClient } from "../api";
import { TransferBucketRequestDto } from "../types/dto/transfer-bucket-request.dto";

export const transferBucketAction = async (
  data: TransferBucketRequestDto
): Promise<void> => {
  await s3BucketsApiClient.transferBucket(data);
};
