import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({ message: "Database connected successfully!" });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    );
  }
}
