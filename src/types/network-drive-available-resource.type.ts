export type NetworkDriveAvailableResource = {
  resource_id: number;
  resource_type: "server";
  ip?: string | null;
  availability_zone: string;
};
