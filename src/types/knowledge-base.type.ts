export type KnowledgeBaseDocument = {
  id: number;
  name: string;
  size: number;
  status: "new" | "indexed" | "indexing" | "error";
  indexing_version?: string | null;
  status_info?: any;
  created_at: string;
  updated_at: string;
};

export type KnowledgeBase = {
  id: number;
  name: string;
  description?: string | null;
  dbaas_id: number;
  status: "active" | "blocked" | "creating" | "deleted";
  last_sync?: string | null;
  total_tokens: number;
  used_tokens: number;
  remaining_tokens: number;
  token_package_id: number;
  subscription_renewal_date: string;
  documents?: KnowledgeBaseDocument[];
  documents_count?: number;
  agents_ids: number[];
  created_at: string;
};
