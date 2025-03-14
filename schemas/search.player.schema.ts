import { z } from "zod";

export const playerSearchSchema = z.object({
  name: z.string().optional(),
  position: z.enum(["LW", "C", "RW", "LD", "RD", "G"]).optional(),
  minAge: z.number().int().min(16).optional(),
  maxAge: z.number().int().max(50).optional(),
  nationality: z.string().optional(),
});

export type PlayerSearchParams = z.infer<typeof playerSearchSchema>;
