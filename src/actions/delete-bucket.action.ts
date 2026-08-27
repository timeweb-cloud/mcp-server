import { s3BucketsApiClient } from "../api";
import { BucketDeleteResponse } from "../types/bucket-delete-response.type";

export const deleteBucketAction = async (
  bucketId: number,
  hash?: string,
  code?: string
): Promise<BucketDeleteResponse> => {
  return await s3BucketsApiClient.deleteBucket(bucketId, hash, code);
};
