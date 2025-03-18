import type {
  UUID,
  ISODateString,
  Dimensions,
  PlayerStats,
  GoalieStats,
} from "./common";
import type { Position } from "./lineup";

interface PlayerPhysical {
  height: Dimensions;
  weight: Dimensions;
  birthdate: ISODateString;
  birthplace: string;
  age: number;
}

export interface Player {
  _id?: UUID; // Database ID
  id: UUID; // Local ID
  name: string;
  number: number;
  nationality: string;
  positions: Position[];
  physical: PlayerPhysical;
  stats: PlayerStats | GoalieStats;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

// Type for creating a new player
export interface CreatePlayerDTO {
  name: string;
  number: number;
  position: string;
  teamId: string;
  nationality?: string;
  physical?: {
    height?: {
      metric: number;
      imperial: string;
    };
    weight?: {
      metric: number;
      imperial: string;
    };
    birthdate?: string;
    birthplace?: string;
  };
  age?: number;
  stats?: {
    goals: number;
    assists: number;
    gamesPlayed: number;
  };
}

// Type for updating an existing player for later use probably
export type UpdatePlayerDTO = Partial<CreatePlayerDTO>;
