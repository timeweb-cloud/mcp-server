import { AddedBucketSubdomain } from "../bucket-subdomain.type";

export type AddBucketSubdomainsResponseDto = {
  subdomains: AddedBucketSubdomain[];
  meta: any;
  response_id?: string;
};
