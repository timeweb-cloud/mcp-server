import { BucketType } from "../bucket.type";

export type CreateBucketRequestDto = {
  name: string;
  type: BucketType;
  description?: string;
  preset_id?: number;
  configurator?: {
    id?: number;
    disk?: number;
  };
  project_id?: number;
};
