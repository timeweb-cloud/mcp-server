import { BucketPreset } from "../bucket-preset.type";

export type GetBucketPresetsResponseDto = {
  storages_presets: BucketPreset[];
  meta: any;
  response_id?: string;
};
