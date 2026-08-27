import { s3BucketsApiClient } from "../api";
import { Bucket } from "../types/bucket.type";

export const listBucketsAction = async (): Promise<Bucket[]> => {
  return await s3BucketsApiClient.listBuckets();
};
