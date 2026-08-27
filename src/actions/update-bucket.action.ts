import { s3BucketsApiClient } from "../api";
import { Bucket } from "../types/bucket.type";
import { UpdateBucketRequestDto } from "../types/dto/update-bucket-request.dto";

export const updateBucketAction = async (
  bucketId: number,
  data: UpdateBucketRequestDto
): Promise<Bucket> => {
  return await s3BucketsApiClient.updateBucket(bucketId, data);
};
