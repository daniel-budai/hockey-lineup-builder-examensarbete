// Common types that might be reused across the application
export type UUID = string;
export type ISODateString = string;

export interface Dimensions {
  metric: number;
  imperial: string;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  gamesPlayed: number;
}

export interface GoalieStats extends Omit<PlayerStats, "plusMinus"> {
  savePercentage: number;
  goalsAgainstAverage: number;
}
