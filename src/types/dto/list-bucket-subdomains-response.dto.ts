import { BucketSubdomain } from "../bucket-subdomain.type";

export type ListBucketSubdomainsResponseDto = {
  subdomains: BucketSubdomain[];
  meta: any;
  response_id?: string;
};
