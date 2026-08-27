import { Bucket } from "../bucket.type";

export type UpdateBucketResponseDto = {
  bucket: Bucket;
  response_id?: string;
};
