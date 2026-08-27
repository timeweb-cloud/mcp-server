import { Bucket } from "../bucket.type";

export type ListBucketsResponseDto = {
  buckets: Bucket[];
  meta: any;
  response_id?: string;
};
