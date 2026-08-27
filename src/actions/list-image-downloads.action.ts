import { imagesApiClient } from "../api";
import { ImageDownload } from "../types/image-download.type";

export const listImageDownloadsAction = async (
  imageId: string,
  limit?: number,
  offset?: number
): Promise<ImageDownload[]> => {
  return await imagesApiClient.listImageDownloads(imageId, limit, offset);
};
