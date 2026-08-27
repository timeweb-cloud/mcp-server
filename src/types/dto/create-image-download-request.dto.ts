import { ImageUrlType } from "../image-download.type";

export type ImageUrlAuth = {
  access_token: string;
  refresh_token?: string;
  expiry?: string;
  token_type?: string;
};

export type CreateImageDownloadRequestDto = {
  type?: ImageUrlType | string;
  filename?: string;
  auth?: ImageUrlAuth;
};
