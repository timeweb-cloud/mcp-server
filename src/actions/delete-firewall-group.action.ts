import { firewallApiClient } from "../api";

export const deleteFirewallGroupAction = async (
  groupId: string
): Promise<void> => {
  await firewallApiClient.deleteFirewallGroup(groupId);
};
