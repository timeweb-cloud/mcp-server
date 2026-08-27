export type BucketTransferOverallStatus = "started" | "suspended" | "failed";

export interface BucketTransferError {
  value: string;
  try: number;
}

export interface BucketTransferStatus {
  status: BucketTransferOverallStatus;
  tries: number;
  total_count: number;
  total_size: number;
  uploaded_count: number;
  uploaded_size: number;
  errors: BucketTransferError[];
}
