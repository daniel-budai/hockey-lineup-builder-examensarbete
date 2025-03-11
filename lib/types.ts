export enum Position {
  C = "C",
  LW = "LW",
  RW = "RW",
  LD = "LD",
  RD = "RD",
  G = "G",
}

export interface Player {
  id: number;
  name: string;
  number: number;
  age: number;
  nationality: string;
  positions: Position[];
  stats?: {
    goals?: number;
    assists?: number;
    points?: number;
    gamesPlayed?: number;
    savePercentage?: number;
    goalsAgainstAverage?: number;
  };
}
