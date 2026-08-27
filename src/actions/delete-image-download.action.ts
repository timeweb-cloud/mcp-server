import { imagesApiClient } from "../api";

export const deleteImageDownloadAction = async (
  imageId: string,
  imageUrlId: string
): Promise<void> => {
  return await imagesApiClient.deleteImageDownload(imageId, imageUrlId);
};
