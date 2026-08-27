export type CreateNetworkDriveRequestDto = {
  name: string;
  size: number;
  preset_id: number;
  comment?: string | null;
};
