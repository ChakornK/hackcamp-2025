import { User } from "../../lib/db";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json({ error: "Token required" }, { status: 400 });
    }

    // Find user by token
    const user = await User.findOne({ tokens: token });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Return user's records
    return Response.json({ 
      records: user.records,
      username: user.username
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}