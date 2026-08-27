export type NetworkDriveServiceItem = {
  resource_id: number;
  resource_type: "server";
};

export type NetworkDriveStatus = "new" | "created" | "failed";

export type NetworkDriveType = "nvme" | "hdd";

export type NetworkDrive = {
  id: string;
  name: string;
  comment: string | null;
  size: number;
  service_list: NetworkDriveServiceItem[];
  location: string;
  status: NetworkDriveStatus;
  availability_zone: string;
  type: NetworkDriveType;
  preset_id: number;
};
