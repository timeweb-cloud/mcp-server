import { ImageLocation, ImageOS } from "../image.type";

export type CreateImageRequestDto = {
  os: ImageOS | string;
  location: ImageLocation | string;
  name?: string;
  description?: string;
  disk_id?: number;
  upload_url?: string;
};
