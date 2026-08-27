export enum ImageUrlStatus {
  PROCESS = "process",
  FAILED = "failed",
  FINISHED = "finished",
  ALREADY_EXISTS = "already_exists",
}

export enum ImageUrlType {
  TIMEWEB = "timeweb",
  GOOGLE_DRIVE = "google_drive",
  YANDEX = "yandex",
}

export type ImageDownload = {
  id: string;
  created_at: string;
  image: string;
  type: ImageUrlType | string;
  url?: string;
  status: ImageUrlStatus | string;
  progress: number;
};
