import Leaderboard from "./components/Leaderboard";

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

  return (
    <main className="bg-[#E5E7EB] p-8 min-h-screen">
      <p>Hello skibidi sigmas!!</p>
      <Leaderboard leaderboards={leaderboardData} />
    </main>
  );
}
