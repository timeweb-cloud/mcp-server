import { BucketDeleteResponse } from "../bucket-delete-response.type";

export type DeleteBucketResponseDto = {
  bucket_delete: BucketDeleteResponse;
  response_id?: string;
};
