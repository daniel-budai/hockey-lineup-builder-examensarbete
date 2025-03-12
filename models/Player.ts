import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a player name"],
  },
  number: {
    type: Number,
    required: [true, "Please provide a jersey number"],
  },
  position: {
    type: String,
    required: [true, "Please provide a position"],
    enum: ["C", "LW", "RW", "D", "G"],
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  nationality: String,
  age: Number,
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
