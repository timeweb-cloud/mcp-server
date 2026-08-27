export type BucketType = "private" | "public";
export type BucketStatus = "no_paid" | "created" | "transfer";
export type BucketStorageClass = "cold" | "hot";

export interface BucketDiskStats {
  size: number;
  used: number;
  is_unlimited: boolean;
}

export interface BucketWebsiteConfig {
  enabled?: boolean;
  index_page?: string;
  error_pages?: Array<{
    code?: number;
    document?: string;
  }>;
}

export interface Bucket {
  id: number;
  name: string;
  description: string;
  disk_stats: BucketDiskStats;
  type: BucketType;
  preset_id: number | null;
  configurator_id: number | null;
  avatar_link: string | null;
  status: BucketStatus;
  object_amount: number;
  location: string;
  hostname: string;
  access_key: string;
  secret_key: string;
  moved_in_quarantine_at: string | null;
  storage_class: BucketStorageClass;
  project_id: number;
  rate_id: number;
  website_config: BucketWebsiteConfig | null;
  is_allow_auto_upgrade: boolean;
}
