import { Bucket } from "../bucket.type";

export type GetBucketResponseDto = {
  bucket: Bucket;
  response_id?: string;
};
