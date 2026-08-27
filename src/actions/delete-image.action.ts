import { imagesApiClient } from "../api";

export const deleteImageAction = async (imageId: string): Promise<void> => {
  return await imagesApiClient.deleteImage(imageId);
};
