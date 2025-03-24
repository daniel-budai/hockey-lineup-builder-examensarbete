import { connectToDatabase } from "@/lib/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { playerFormSchema } from "@/schemas/player.schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    console.log("Fetching players for teamId:", teamId);

    await connectToDatabase();
    const players = await Player.find({ teamId });

    console.log("Found players in database:", players);

    return NextResponse.json({ success: true, players });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
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

    const body = await request.json();
    console.log("Received body in API:", body);

    const result = playerFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: result.error.issues,
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Use the existing teamId without creating a new ObjectId
    const playerData = {
      ...result.data,
      teamId: result.data.teamId, // Don't create a new ObjectId
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Creating player with data:", playerData);

    const player = await Player.create(playerData);

    return NextResponse.json({ success: true, player });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      {
        error: "Failed to create player",
      },
      { status: 500 }
    );
  }
}
