import { Image } from "../image.type";

export type ListImagesResponseDto = {
  images: Image[];
  meta: { total: number };
};
