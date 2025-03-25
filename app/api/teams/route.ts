import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/models/Team";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { teamSchema } from "@/schemas/team.schema";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    console.log("Received team data:", body);

    const result = teamSchema.safeParse(body);

    if (!result.success) {
      console.log("Validation errors:", result.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: result.error.issues,
          receivedData: body,
        },
        { status: 400 }
      );
    }

    const team = await Team.create({
      ...result.data,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Team creation failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create team",
        details: error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    await connectToDatabase();

    if (!session?.user?.id) {
      return NextResponse.json({
        teams: [],
        message: "Please log in to view and create teams",
        requiresAuth: true,
      });
    }

    const teams = await Team.find({ userId: session.user.id });
    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
