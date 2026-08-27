import { DedicatedServerPreset } from "../dedicated-server.type";

export type ListDedicatedServerPresetsResponseDto = {
  meta: { total: number };
  dedicated_servers_presets: DedicatedServerPreset[];
};
