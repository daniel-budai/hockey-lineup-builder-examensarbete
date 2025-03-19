import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  number: {
    type: String,
    required: [true, "Please provide a jersey number"],
    match: [/^\d{1,2}$/, "Player number must be 1-2 digits"],
  },
  positions: {
    type: [String],
    enum: ["LW", "C", "RW", "LD", "RD", "G"],
    required: [true, "Please provide at least one position"],
  },
  teamId: {
    // Changed from team to teamId to match form data
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "Team ID is required"],
  },
  nationality: String,
  birthplace: String,
  birthdate: String, // Keep as string to match form
  heightCm: String, // Keep as string to match form
  heightFt: String,
  heightIn: String,
  weightKg: String, // Keep as string to match form
  weightLbs: String,
  isForward: Boolean,
  isDefense: Boolean,
  isGoalie: Boolean,
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
