import type { ISODateString, UUID } from "./common";
import type { Player } from "./player";

export const POSITIONS = ["LW", "C", "RW", "LD", "RD", "G"] as const;
export type Position = (typeof POSITIONS)[number];

export const FORWARD_POSITIONS = ["LW", "C", "RW"] as const;
export type ForwardPosition = (typeof FORWARD_POSITIONS)[number];

export const DEFENSE_POSITIONS = ["LD", "RD"] as const;
export type DefensePosition = (typeof DEFENSE_POSITIONS)[number];

export type GoaliePosition = "G";

export interface LineConfiguration {
  LW: Player | null;
  C: Player | null;
  RW: Player | null;
  LD: Player | null;
  RD: Player | null;
  G: Player | null;
}

export interface LineupData {
  id?: UUID;
  teamId: UUID;
  name: string;
  line1: LineConfiguration;
  line2: LineConfiguration;
  line3: LineConfiguration;
  line4: LineConfiguration;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export type CreateLineupDTO = Omit<
  LineupData,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateLineupDTO = Partial<CreateLineupDTO>;
