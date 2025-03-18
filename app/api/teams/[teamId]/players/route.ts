import { connectToDatabase } from "@/lib/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      //ID?
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const players = await Player.find({ team: params.teamId });
    return NextResponse.json({ success: true, players });
  } catch (error) {
    console.error("Failed to fetch team players:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team players" },
      { status: 500 }
    );
  }
}
