"use client";
import React, { useContext } from "react";
import Streaks from "./components/streaks";
import StudyStats from "./components/studystats";
import Leaderboard from "./components/leaderboard";
import BarChartComponent from "./components/chart";
import { useRouter } from "next/navigation";
import Timer from "./components/timer";
import { GlobalContext } from "./lib/globalState";

const entries = [
  { date: "2025-11-10" },
  { date: "2025-11-11" },
  { date: "2025-11-12" },
  { date: "2025-11-14" },
  { date: "2025-11-15" },
  { date: "2025-11-16" },
];

export default function Home() {
  const {token} = useContext(GlobalContext)

  if (!token) {
    return <p>Please log in to view your stats</p>;
  }

  const leaderboardData = [
    {
      title: "Leaderboard",
      data: [
        { rank: 1, name: "HackCamper", value: "4hr 20min" },
        { rank: 2, name: "Kregor Giczales", value: "1hr 9min" },
        { rank: 3, name: "Big Chungus", value: "1hr 7min" },
      ],
    },
    {
      title: "Hall of shame :(",
      data: [
        { rank: 1, name: "Brick Nadley", value: "35%" },
        {
          rank: 2,
          name: "Gon Rarcia",
          value: "42%",
        },
        { rank: 3, name: "Diddy Blud", value: "67%" },
        { rank: 4, name: "Lebron James", value: "69%" }
      ],
    },
  ];

  return (
    <main className="bg-gray-200 p-8 min-h-screen">
      <div className="top-0 right-0 left-0 z-10 fixed flex justify-between items-center bg-gray-100 px-8 h-24">
        <h1 className="font-bold text-5xl text-center">Reel Rewards Dashboard</h1>
      </div>
      <div className="w-full h-24"></div>

      <div className="space-y-6 mx-auto max-w-7xl">
        <div className="gap-6 grid grid-cols-3">
          <Timer />
          <Streaks entries={entries} />
          <StudyStats studyMinutes={120} averageStudyLength={30} />
        </div>

        <div className="flex gap-6">
          <div className="bg-amber-50 shadow-md hover:shadow-xl p-8 border-2 border-amber-400 rounded-3xl overflow-hidden transition-shadow grow scrollbar-hide">
            <BarChartComponent token={token}/>
          </div>
          <div className="max-w-[400px] shrink-0">
            <Leaderboard leaderboards={leaderboardData} />
          </div>
        </div>
      </div>
    </main>
  );
}
