import { sessionStartTimes } from "../../stateManager";

export async function POST(req) {
    const { timestamp, token } = await req.json()
    if (Math.abs(Date.now()-timestamp) > 60 * 1000) {
        return Response.json({error: "Invalid data"}, {status: 400})
    }

    sessionStartTimes[token]=timestamp

    return Response.json({message: "OK"}, {status: 200})
}