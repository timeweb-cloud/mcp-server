import { BucketType } from "../bucket.type";

export type UpdateBucketRequestDto = {
  preset_id?: number;
  configurator?: {
    id?: number;
    disk?: number;
  };
  bucket_type?: BucketType;
  description?: string;
};
