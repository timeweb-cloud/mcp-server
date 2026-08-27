import { imagesApiClient } from "../api";
import { ImageDownload } from "../types/image-download.type";

export const getImageDownloadAction = async (
  imageId: string,
  imageUrlId: string
): Promise<ImageDownload> => {
  return await imagesApiClient.getImageDownload(imageId, imageUrlId);
};
