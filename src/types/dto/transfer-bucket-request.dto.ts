export type TransferBucketRequestDto = {
  access_key: string;
  secret_key: string;
  location: string;
  is_force_path_style: boolean;
  endpoint: string;
  bucket_name: string;
  new_bucket_name: string;
};
