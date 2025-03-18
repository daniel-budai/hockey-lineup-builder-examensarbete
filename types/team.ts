import type { UUID, ISODateString } from "./common";

export interface TeamColors {
  primary: string;
  secondary: string;
}

export interface TeamLocation {
  city: string;
  arena?: string;
  country: string;
}

export interface TeamDivision {
  conference: string;
  division: string;
}

export interface Team {
  _id: UUID;
  name: string;
  abbreviation: string;
  location: TeamLocation;
  division: TeamDivision;
  colors: TeamColors;
  foundedYear: number;
  logoUrl?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// Type for creating a new team
export type CreateTeamDTO = Omit<Team, "_id" | "createdAt" | "updatedAt">;

// Type for updating an existing team
export type UpdateTeamDTO = Partial<CreateTeamDTO>;
