import { s3BucketsApiClient } from "../api";
import { AddedBucketSubdomain } from "../types/bucket-subdomain.type";

export const deleteBucketSubdomainsAction = async (
  bucketId: number,
  subdomains: string[]
): Promise<AddedBucketSubdomain[]> => {
  return await s3BucketsApiClient.deleteBucketSubdomains(bucketId, subdomains);
};
