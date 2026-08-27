import { AddedBucketSubdomain } from "../bucket-subdomain.type";

export type DeleteBucketSubdomainsResponseDto = {
  subdomains: AddedBucketSubdomain[];
  meta: any;
  response_id?: string;
};
