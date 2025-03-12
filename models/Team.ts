import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a team name"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  country: String,
  primaryColor: String,
  secondaryColor: String,
  logoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
