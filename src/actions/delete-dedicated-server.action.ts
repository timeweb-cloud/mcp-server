import { dedicatedServersApiClient } from "../api";

export const deleteDedicatedServerAction = async (
  dedicatedId: number
): Promise<void> => {
  await dedicatedServersApiClient.deleteDedicatedServer(dedicatedId);
};
