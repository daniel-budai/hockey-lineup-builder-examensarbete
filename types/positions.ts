export const POSITIONS = ["LW", "C", "RW", "LD", "RD", "G"] as const;
export const FORWARD_POSITIONS = ["LW", "C", "RW"] as const;
export const DEFENSE_POSITIONS = ["LD", "RD"] as const;

export type Position = (typeof POSITIONS)[number];
export type ForwardPosition = (typeof FORWARD_POSITIONS)[number];
export type DefensePosition = (typeof DEFENSE_POSITIONS)[number];
export type GoaliePosition = "G";
