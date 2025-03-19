import type { Position } from "./positions";
import type { LineNumber } from "./lineup";

export interface DragItem {
  id: string;
  type: "PLAYER" | "POSITION";
  sourcePosition?: Position;
  sourceLine?: LineNumber;
}

export interface DropResult {
  targetPosition: Position;
  targetLine: LineNumber;
}
