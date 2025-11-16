"use client";
import React from "react";
import Streaks from "./components/streaks";
import StudyStats from "./components/studystats";
import Leaderboard from "./components/leaderboard";
import BarChartComponent from "./components/chart";
import { useRouter } from "next/navigation";
import Timer from "./components/timer";

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
        {
          rank: 2,
          name: "Big Beautiful Billy Joel this is to test long names",
          value: "42%",
        },
        { rank: 3, name: "Diddy Blud", value: "67%" },
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

        <div className="gap-6 grid grid-cols-[2fr_400px]">
          <div className="bg-white shadow-md hover:shadow-xl p-8 rounded-3xl min-w-0 max-h-[500px] overflow-auto transition-shadow scrollbar-hide">
            <BarChartComponent />
          </div>
          <div className="min-w-0 max-w-[400px]">
            <Leaderboard leaderboards={leaderboardData} />
          </div>
        </div>
      </div>
    </main>
  );
}
