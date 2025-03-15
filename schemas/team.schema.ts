import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  abbreviation: z
    .string()
    .min(1, "Abbreviation is required")
    .max(3, "Abbreviation must be 3 characters or less"),
  city: z.string().optional(),
  country: z.string().optional(),
  foundedYear: z
    .number()
    .min(1800, "Year must be at least 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional()
    .nullable(),
  arena: z.string().optional(),
  division: z.string().optional(),
  conference: z.string().optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
});

export type TeamInput = z.infer<typeof teamSchema>;
