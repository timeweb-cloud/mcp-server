import { s3BucketsApiClient } from "../api";
import { Bucket } from "../types/bucket.type";
import { CreateBucketRequestDto } from "../types/dto/create-bucket-request.dto";

export const createBucketAction = async (
  data: CreateBucketRequestDto
): Promise<Bucket> => {
  return await s3BucketsApiClient.createBucket(data);
};
