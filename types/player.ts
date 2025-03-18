import type { Position } from "./positions";

export interface PlayerStats {
  goals?: number;
  assists?: number;
  points?: number;
  plusMinus?: number;
  gamesPlayed?: number;
  savePercentage?: number;
  goalsAgainstAverage?: number;
}

export interface PlayerHeight {
  cm?: number;
  imperial?: string;
}

export interface PlayerWeight {
  kg?: number;
  lbs?: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  age: number;
  nationality: string;
  positions: Position[];
  stats?: PlayerStats;
  height?: PlayerHeight;
  weight?: PlayerWeight;
  birthplace?: string;
  birthdate?: string;
}
