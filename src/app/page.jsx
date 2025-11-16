import Streaks from "./components/streaks";
import StudyStats from "./components/studystats";
import Leaderboard from "./components/Leaderboard";

const entries = [
  { date: "2025-11-10" },
  { date: "2025-11-11" },
  { date: "2025-11-12" },
  { date: "2025-11-14" },
  { date: "2025-11-15" },
  { date: "2025-11-16" },
];

export default function Home() {
  const leaderboardData = [
    {
      title: "Leaderboard",
      data: [
        { rank: 1, name: "Donald Trump", value: "3hr 5min" },
        { rank: 2, name: "Agartha", value: "2hr 59min" },
        { rank: 3, name: "Yo mama", value: "1hr 9min" },
      ],
    },
    {
      title: "Hall of shame :(",
      data: [
        { rank: 1, name: "Donald Trump", value: "35%" },
        { rank: 2, name: "Big Beautiful Bill", value: "42%" },
        { rank: 3, name: "Diddy Blud", value: "67%" },
      ],
    },
  ];

  const Timer = () => (
    <div className="flex justify-center items-center bg-[#D1D5DB] p-8 rounded-3xl h-full">
      Timer Component
    </div>
  );

  const Graph = () => (
    <div className="flex justify-center items-center bg-[#D1D5DB] p-8 rounded-3xl h-full">
      Graph Component
    </div>
  );

  return (
    <main className="bg-[#E5E7EB] p-8 min-h-screen">
      <h1 className="mb-8 font-bold text-5xl text-center">
        Reel Rewards Dashboard
      </h1>
      <div className="space-y-6 mx-auto max-w-7xl">
        <div className="gap-6 grid grid-cols-3">
          <Timer />
          <Streaks entries={entries} />
          <StudyStats studyMinutes={120} averageStudyLength={30} />
        </div>

        <div className="gap-6 grid grid-cols-3">
          <div className="col-span-2">
            <Graph />
          </div>
          <div>
            <Leaderboard leaderboards={leaderboardData} />
          </div>
        </div>
      </div>
    </main>
  );
}
