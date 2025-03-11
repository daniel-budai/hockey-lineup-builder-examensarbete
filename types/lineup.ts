export interface Player {
  id: string;
  name: string;
  number: number;
  age: number;
  nationality: string;
  positions: string[];
  stats?: {
    goals?: number;
    assists?: number;
    points?: number;
    plusMinus?: number;
    gamesPlayed?: number;
    savePercentage?: number;
    goalsAgainstAverage?: number;
  };
  height?: {
    cm?: number;
    imperial?: string;
  };
  weight?: {
    kg?: number;
    lbs?: number;
  };
  birthplace?: string;
  birthdate?: string;
}

export type Position = "LW" | "C" | "RW" | "LD" | "RD" | "G";

export interface LineConfiguration {
  LW: Player | null;
  C: Player | null;
  RW: Player | null;
  LD: Player | null;
  RD: Player | null;
  G: Player | null;
}

export interface LineupData {
  line1: LineConfiguration;
  line2: LineConfiguration;
  line3: LineConfiguration;
  line4: LineConfiguration;
}
