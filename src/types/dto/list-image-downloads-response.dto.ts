import { ImageDownload } from "../image-download.type";

export type ListImageDownloadsResponseDto = {
  downloads: ImageDownload[];
  meta: { total: number };
};
