export type ServicePrice = {
  cost: number;
  total_cost: number;
  type: string;
  service_id?: number | string;
  project_id?: number | null;
  configuration?: {
    cpu?: number;
    ram?: number;
    disk?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};
