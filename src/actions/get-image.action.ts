import { imagesApiClient } from "../api";
import { Image } from "../types/image.type";

export const getImageAction = async (imageId: string): Promise<Image> => {
  return await imagesApiClient.getImage(imageId);
};
