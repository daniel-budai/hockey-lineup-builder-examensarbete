import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: String,
  number: Number,
  positions: [String],
  nationality: String,
  birthdate: Date,
  height: {
    cm: Number,
    imperial: String,
  },
  weight: {
    kg: Number,
    lbs: Number,
  },
});

const LineSchema = new mongoose.Schema({
  LW: PlayerSchema,
  C: PlayerSchema,
  RW: PlayerSchema,
  LD: PlayerSchema,
  RD: PlayerSchema,
  G: PlayerSchema,
});

const LineupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  line1: LineSchema,
  line2: LineSchema,
  line3: LineSchema,
  line4: LineSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a compound unique index
LineupSchema.index({ userId: 1, teamId: 1 }, { unique: true });

export default mongoose.models.Lineup || mongoose.model("Lineup", LineupSchema);
