import { User } from "../../lib/db";
import { sha256 } from "../../lib/sha256";
import { createToken } from "../../lib/token";

export async function POST(req) {
  const { username, password } = await req.json();
  const hashedPassword = await sha256(password);

  const user = await User.findOne({ username });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });
  if (user.hashedPassword !== hashedPassword) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const token = createToken(username);
  user.tokens.push(token);
  while (user.tokens.length > 10) {
    user.tokens.shift();
  }
  await user.save();

  return Response.json({ token });
}
