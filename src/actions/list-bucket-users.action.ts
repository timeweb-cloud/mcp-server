import { s3BucketsApiClient } from "../api";
import { BucketUser } from "../types/bucket-user.type";

export const listBucketUsersAction = async (): Promise<BucketUser[]> => {
  return await s3BucketsApiClient.listBucketUsers();
};
