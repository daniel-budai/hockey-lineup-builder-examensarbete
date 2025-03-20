import { z } from "zod";

export const positionEnum = z.enum(["LW", "C", "RW", "LD", "RD", "G"]);

export const playerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  number: z.string().regex(/^\d{1,2}$/, "Player number must be 1-2 digits"),
  heightCm: z.string().optional(),
  heightFt: z.string().optional(),
  heightIn: z.string().optional(),
  weightKg: z.string().optional(),
  weightLbs: z.string().optional(),
  nationality: z.string().optional(),
  birthplace: z.string().optional(),
  birthdate: z.string().optional(),
  age: z.string().optional(),
  positions: z.array(positionEnum).min(1, "At least one position is required"),
  teamId: z.string().min(1, "Team ID is required").optional(), //do i even need this?
  isForward: z.boolean(),
  isDefense: z.boolean(),
  isGoalie: z.boolean(),
});

export type PlayerFormData = z.infer<typeof playerFormSchema>;
