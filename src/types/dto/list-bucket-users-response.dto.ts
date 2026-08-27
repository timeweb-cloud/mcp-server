import { BucketUser } from "../bucket-user.type";

export type ListBucketUsersResponseDto = {
  users: BucketUser[];
  meta: any;
  response_id?: string;
};
