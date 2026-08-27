import { s3BucketsApiClient } from "../api";

export const addBucketSubdomainCertificateAction = async (
  subdomain: string
): Promise<void> => {
  await s3BucketsApiClient.addBucketSubdomainCertificate(subdomain);
};
