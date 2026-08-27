// Ответы списков конкретных типов ресурсов (и в проекте, и на аккаунте).
// Используем permissive any[] — точные схемы для каждого ресурса уже могут
// быть покрыты собственными API-группами (servers.ts и т.д.).

export type ListResourceServersResponseDto = {
  servers: any[];
  meta: { total: number };
};

export type ListResourceBalancersResponseDto = {
  balancers: any[];
  meta: { total: number };
};

export type ListResourceBucketsResponseDto = {
  buckets: any[];
  meta: { total: number };
};

export type ListResourceClustersResponseDto = {
  clusters: any[];
  meta: { total: number };
};

export type ListResourceDatabasesResponseDto = {
  databases: any[];
  meta: { total: number };
};

export type ListResourceDedicatedResponseDto = {
  dedicated_servers: any[];
  meta: { total: number };
};
