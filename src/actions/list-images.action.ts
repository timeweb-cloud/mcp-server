import { imagesApiClient } from "../api";
import { Image } from "../types/image.type";

export const listImagesAction = async (
  limit?: number,
  offset?: number
): Promise<Image[]> => {
  return await imagesApiClient.listImages(limit, offset);
};
