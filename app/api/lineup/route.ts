import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
import Lineup from "@/models/Lineup";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    // Log the session to debug what we're getting
    console.log("Session data:", session);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First, find the user's ID from their email
    const User = mongoose.model("User");
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();

    // Make sure we have a teamId in the request
    if (!data.teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    // Create lineup with user email as identifier
    const lineup = await Lineup.create({
      ...data,
      userId: user._id, // Use the actual MongoDB ObjectId
    });

    return NextResponse.json(lineup);
  } catch (error) {
    console.error("Error saving lineup:", error);
    return NextResponse.json(
      { error: "Failed to save lineup" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");

    // First, find the user by email to get their ObjectId
    const User = mongoose.model("User");
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Searching for lineups with:", {
      userId: user._id, // Now using the ObjectId instead of email
      teamId: teamId,
    });

    const lineups = await Lineup.find({
      userId: user._id, // Use the ObjectId here
      ...(teamId ? { teamId } : {}),
    }).sort({ createdAt: -1 });

    console.log("Found lineups:", lineups);

    return NextResponse.json(lineups);
  } catch (error) {
    console.error("Error in GET /api/lineup:", error);
    return NextResponse.json(
      { error: "Failed to fetch lineups", details: error.message },
      { status: 500 }
    );
  }
}
