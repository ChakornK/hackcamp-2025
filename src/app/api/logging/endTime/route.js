import { User } from "../../lib/db";
import { sessionStartTimes, userTokens } from "../../stateManager";

export async function POST(req) {
  const { timestamp, token, subject } = await req.json();
  if (!token) {
    return Response.json({ error: "No token provided" }, { status: 400 });
  }
  if (Math.abs(Date.now() - timestamp) > 60 * 1000) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  if (!sessionStartTimes[token]) {
    return Response.json({ error: "No session found " }, { status: 400 });
  }

  const startTime = sessionStartTimes[token].timestamp;
  const sessionSubject = sessionStartTimes[token].subject;
  const endTime = timestamp;
  const durationSeconds = Math.floor((endTime - startTime) / 1000);

  const date = new Date(startTime).toISOString().split("T")[0];

  try {
    const username = token.split("-")[0];
    if (!username) return Response.json({ error: "Invalid token" }, { status: 401 });
    const user = await User.findOne({ username });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const existingRecordIndex = user.records.findIndex((record) => record.date === date);

    if (existingRecordIndex !== -1) {
      user.records[existingRecordIndex].totalStudyDuration += durationSeconds;

      // Check if subject exists in this date's records
      const subjectIndex = user.records[existingRecordIndex].subjects.findIndex(
        (s) => s.subject === sessionSubject
      );
      
      if (subjectIndex !== -1) {
        // Add to existing subject
        user.records[existingRecordIndex].subjects[subjectIndex].duration += durationSeconds;
      } else {
        // Create new subject entry
        user.records[existingRecordIndex].subjects.push({
          subject: sessionSubject,
          duration: durationSeconds
        });
      }
    } else {
      user.records.push({
        date: date,
        totalStudyDuration: durationSeconds,
        subjects: [{
          subject: sessionSubject,
          duration: durationSeconds
        }]
      });
    }

    await user.save();

    delete sessionStartTimes[token];

    return Response.json(
      {
        message: "OK",
        duration: durationSeconds,
        date: date,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Database error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
