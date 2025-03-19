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
  _id: string;
  firstName: string;
  lastName: string;
  number: string;
  positions: Position[];
  teamId: string;
  nationality?: string;
  birthplace?: string;
  birthdate?: string;
  age?: string;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  weightKg?: string;
  weightLbs?: string;
  isForward: boolean;
  isDefense: boolean;
  isGoalie: boolean;
  stats?: {
    // Field player stats
    goals?: number;
    assists?: number;
    points?: number;
    plusMinus?: number;
    gamesPlayed?: number;

    // Goalie stats
    savePercentage?: number;
    goalsAgainstAverage?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
