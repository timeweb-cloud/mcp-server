import { s3BucketsApiClient } from "../api";
import { AddedBucketSubdomain } from "../types/bucket-subdomain.type";

export const addBucketSubdomainsAction = async (
  bucketId: number,
  subdomains: string[]
): Promise<AddedBucketSubdomain[]> => {
  return await s3BucketsApiClient.addBucketSubdomains(bucketId, subdomains);
};
