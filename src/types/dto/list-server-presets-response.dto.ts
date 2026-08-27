import { ServerPreset } from "../server-preset.type";

export type ListServerPresetsResponseDto = {
  server_presets: ServerPreset[];
  meta: { total: number };
};
