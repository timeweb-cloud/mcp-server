import { s3BucketsApiClient } from "../api";
import { BucketSubdomain } from "../types/bucket-subdomain.type";

export const listBucketSubdomainsAction = async (
  bucketId: number
): Promise<BucketSubdomain[]> => {
  return await s3BucketsApiClient.listBucketSubdomains(bucketId);
};
