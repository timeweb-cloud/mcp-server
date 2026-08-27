export type BucketPresetStorageClass = "cold" | "hot";

export interface BucketPreset {
  id: number;
  description: string;
  description_short: string;
  disk: number;
  price: number;
  location: string;
  tags: string[];
  storage_class: BucketPresetStorageClass;
}
