export enum ImageStatus {
  NEW = "new",
  CREATED = "created",
  FAILED = "failed",
  DELETED = "deleted",
}

export enum ImageOS {
  CENTOS = "centos",
  ALMALINUX = "almalinux",
  DEBIAN = "debian",
  BITRIX = "bitrix",
  UBUNTU = "ubuntu",
  BRAINYCP = "brainycp",
  ARCHLINUX = "archlinux",
  ASTRALINUX = "astralinux",
  WINDOWS = "windows",
  CUSTOM_OS = "custom_os",
  OTHER = "other",
}

export enum ImageLocation {
  RU_1 = "ru-1",
  RU_2 = "ru-2",
  PL_1 = "pl-1",
  KZ_1 = "kz-1",
  NL_1 = "nl-1",
}

export enum ImageType {
  QCOW2 = "qcow2",
  ISO = "iso",
}

export type Image = {
  id: string;
  status: ImageStatus | string;
  created_at: string;
  deleted_at: string | null;
  size: number;
  virtual_size: number;
  name: string;
  description: string;
  disk_id: number | null;
  location: ImageLocation | string;
  os: ImageOS | string;
  progress: number;
  is_custom: boolean;
  type: ImageType | string;
};
