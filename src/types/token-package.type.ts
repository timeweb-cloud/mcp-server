export type TokenPackage = {
  id: number;
  model_id: number;
  name: string;
  package_type: "base" | "additional" | "promo";
  type: "agent" | "knowledgebase";
  token_amount: number;
  price: number;
  duration_days?: number | null;
  is_available: boolean;
};
