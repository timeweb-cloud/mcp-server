export type BucketSubdomainStatus =
  | "ssl_released"
  | "ssl_not_requested"
  | "ssl_re_release_error";

export interface BucketSubdomain {
  id: number;
  subdomain: string;
  cert_released: string;
  tries: number;
  status: BucketSubdomainStatus;
}

export type AddedBucketSubdomainStatus =
  | "success"
  | "empty_cname"
  | "duplicate"
  | "failed";

export interface AddedBucketSubdomain {
  subdomain: string;
  status: AddedBucketSubdomainStatus;
}
