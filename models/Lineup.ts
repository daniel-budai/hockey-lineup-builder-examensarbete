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
  LW: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  C: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  RW: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  LD: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  RD: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  G: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
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
