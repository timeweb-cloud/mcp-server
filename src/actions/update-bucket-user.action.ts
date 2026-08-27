import { s3BucketsApiClient } from "../api";
import { BucketUser } from "../types/bucket-user.type";

export const updateBucketUserAction = async (
  userId: number,
  secretKey: string
): Promise<BucketUser> => {
  return await s3BucketsApiClient.updateBucketUser(userId, secretKey);
};
