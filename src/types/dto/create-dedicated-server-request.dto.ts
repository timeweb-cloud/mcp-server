import { DedicatedServerPaymentPeriod } from "../dedicated-server.type";

export type CreateDedicatedServerRequestDto = {
  preset_id: number;
  payment_period: DedicatedServerPaymentPeriod;
  name: string;
  plan_id?: number | null;
  os_id?: number | null;
  cp_id?: number | null;
  bandwidth_id?: number | null;
  network_drive_id?: number;
  additional_ip_addr_id?: number | null;
  comment?: string | null;
  project_id?: number | null;
};
