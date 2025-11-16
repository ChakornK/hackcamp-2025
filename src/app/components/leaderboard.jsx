export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Donald Trump", time: "3hr 5min" },
    { rank: 2, name: "Agartha", time: "2hr 59min" },
    { rank: 3, name: "Yo mama", time: "1hr 9min" },
  ];

  return (
    <div className="bg-[#D1D5DB] p-8 rounded-3xl w-full max-w-md">
      <h2 className="mb-6 font-bold text-2xl text-center">Leaderboard</h2>

      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div key={entry.rank} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">{entry.rank}.</span>
              <span className="font-semibold text-lg">{entry.name}</span>
            </div>
            <span className="font-semibold text-lg">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
