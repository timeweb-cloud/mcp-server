import { Bucket } from "../bucket.type";

export type CreateBucketResponseDto = {
  bucket: Bucket;
  response_id?: string;
};
