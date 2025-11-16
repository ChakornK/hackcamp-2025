import { User } from "../../lib/db";
import { sha256 } from "../../lib/sha256";

export async function POST(req) {
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) return Response.json({ error: "User already exists" }, { status: 401 });

  const hashedPassword = await sha256(password);
  const token = crypto.randomUUID();

  const user = User({ username, hashedPassword, tokens: [token] });
  await user.save();

  return Response.json({ token });
}
