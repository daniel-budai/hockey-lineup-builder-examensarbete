import { connectToDatabase } from "@/lib/mongodb";
import Lineup from "@/models/Lineup";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const lineups = await Lineup.find({
      userId: session.user.id,
      teamId: teamId,
    });
    return NextResponse.json({ success: true, lineups });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lineups" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    if (!data.teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const lineup = await Lineup.create({
      ...data,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, lineup });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lineup" },
      { status: 500 }
    );
  }
}
