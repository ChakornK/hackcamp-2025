import { User } from "../../lib/db";

export async function POST(req) {
  const { token } = await req.json();
  const [username] = token.split("-");

  const existingUser = await User.findOne({ username });
  if (existingUser.tokens.includes(token)) {
    return Response.json({ valid: true });
  } else {
    return Response.json({ valid: false });
  }
}
