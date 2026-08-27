export type ServerIp = {
  type: "ipv4" | "ipv6" | string;
  ip: string;
  ptr: string;
  is_main: boolean;
};
