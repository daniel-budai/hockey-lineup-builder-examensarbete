import type { Position } from "./positions";

export interface PlayerFormData {
  // Required fields
  number: string;
  firstName: string;
  lastName: string;
  positions: Position[];
  isForward: boolean;
  isDefense: boolean;
  isGoalie: boolean;

  // Optional fields with proper types
  age: string;
  nationality: string;
  birthdate: string;
  birthplace: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weightKg: string;
  weightLbs: string;
}

export interface FormErrors {
  // Required field errors
  number?: string;
  firstName?: string;
  lastName?: string;
  positions?: string;

  // Optional field errors
  age?: string;
  nationality?: string;
  birthdate?: string;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  weightKg?: string;
  weightLbs?: string;
  birthplace?: string;

  // Position type errors
  isForward?: string;
  isDefense?: string;
  isGoalie?: string;
}
