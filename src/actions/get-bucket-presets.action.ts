import { s3BucketsApiClient } from "../api";
import { BucketPreset } from "../types/bucket-preset.type";

export const getBucketPresetsAction = async (): Promise<BucketPreset[]> => {
  return await s3BucketsApiClient.getBucketPresets();
};
