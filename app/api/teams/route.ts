import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const team = await Team.create(data);

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Team creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const teams = await Team.find({});
    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
