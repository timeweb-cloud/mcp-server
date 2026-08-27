import { s3BucketsApiClient } from "../api";
import { Bucket } from "../types/bucket.type";

export const getBucketAction = async (bucketId: number): Promise<Bucket> => {
  return await s3BucketsApiClient.getBucket(bucketId);
};
