export type K8sPreset = {
  id: number;
  description: string;
  description_short: string;
  price: number;
  cpu: number;
  ram: number;
  disk: number;
  network: number;
  type: "worker" | "master";
  // Присутствует только у master-пресетов
  limit?: number;
};
