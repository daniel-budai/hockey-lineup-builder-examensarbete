// import { connectToDatabase } from "@/lib/mongodb";
// import Lineup from "@/models/Lineup";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(
//   request: Request,
//   { params }: { params: { teamId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectToDatabase();
//     const lineups = await Lineup.find({
//       userId: session.user.id,
//       teamId: params.teamId,
//     }).sort({ updatedAt: -1 });

//     return NextResponse.json({ success: true, lineups });
//   } catch (error) {
//     console.error("Failed to fetch lineups:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch lineups" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(
//   request: Request,
//   { params }: { params: { teamId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const teamId = params.teamId;

//     if (!teamId || teamId === "undefined") {
//       return NextResponse.json(
//         { success: false, error: "Invalid team ID" },
//         { status: 400 }
//       );
//     }

//     const data = await request.json();
//     await connectToDatabase();

//     const lineup = await Lineup.create({
//       userId: session.user.id,
//       teamId,
//       ...data,
//       updatedAt: new Date(),
//     });

//     return NextResponse.json({ success: true, lineup });
//   } catch (error) {
//     console.error("Failed to create lineup:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to create lineup" },
//       { status: 500 }
//     );
//   }
// }
