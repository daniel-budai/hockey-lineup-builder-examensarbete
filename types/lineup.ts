import type { Player } from "./player";
import type { Position } from "./positions";

export type LineNumber = "line1" | "line2" | "line3" | "line4";
export type LineTab = LineNumber;
export type LineConfiguration = Record<Position, Player | null>;
export type LineupData = Record<LineNumber, LineConfiguration>;

export type LineupAction =
  | { type: "ADD_PLAYER"; line: LineNumber; position: Position; player: Player }
  | { type: "REMOVE_PLAYER"; line: LineNumber; position: Position }
  | { type: "RESET_LINE"; line: LineNumber }
  | { type: "RESET_LINEUP" };
