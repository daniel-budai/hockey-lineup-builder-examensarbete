import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response("Error fetching profile", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const updates = await request.json();

    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: updates.name,
        email: updates.email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json({
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Error updating profile", { status: 500 });
  }
}
