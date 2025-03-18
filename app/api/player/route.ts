import { connectToDatabase } from "@/lib/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { playerFormSchema } from "@/schemas/player.schema";

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
    const players = await Player.find({
      teamId,
      userId: session.user.id,
    });
    return NextResponse.json({ success: true, players });
  } catch (error) {
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

    if (!body.teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    // Transform the data to match your MongoDB schema
    const playerData = {
      name: `${body.firstName} ${body.lastName}`,
      number: Number(body.number),
      position: body.positions[0], // Single position from array
      team: body.teamId, // MongoDB expects 'team' not 'teamId'
      nationality: body.nationality,
      age: body.age ? Number(body.age) : undefined,
      stats: {
        goals: 0,
        assists: 0,
        gamesPlayed: 0,
      },
      userId: session.user.id, // Add the user ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Data being saved to MongoDB:", playerData);

    await connectToDatabase();
    const player = await Player.create(playerData);

    return NextResponse.json({ success: true, player });
  } catch (error) {
    console.error("Player creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create player" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { playerId, ...updateData } = body;

    if (!playerId) {
      return NextResponse.json(
        { error: "Player ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const player = await Player.findOneAndUpdate(
      { _id: playerId, userId: session.user.id },
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, player });
  } catch (error) {
    console.error("Player update failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update player" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return NextResponse.json(
        { error: "Player ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const result = await Player.deleteOne({
      _id: playerId,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Player deletion failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
