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
    type: Number,
    required: [true, "Please provide a jersey number"],
  },
  positions: [
    {
      type: String,
      enum: ["LW", "C", "RW", "LD", "RD", "G"],
      required: [true, "At least one position is required"],
    },
  ],
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  nationality: String,
  birthplace: String,
  birthdate: String,
  age: Number,
  physical: {
    height: {
      metric: Number,
      imperial: String,
    },
    weight: {
      metric: Number,
      imperial: String,
    },
  },
  isForward: {
    type: Boolean,
    default: false,
  },
  isDefense: {
    type: Boolean,
    default: false,
  },
  isGoalie: {
    type: Boolean,
    default: false,
  },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    plusMinus: { type: Number, default: 0 },
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
