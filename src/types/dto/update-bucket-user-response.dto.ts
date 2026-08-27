import { BucketUser } from "../bucket-user.type";

export type UpdateBucketUserResponseDto = {
  user: BucketUser;
  response_id?: string;
};
