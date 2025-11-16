"use client"
import React from 'react';
import Streaks from './components/streaks';
import StudyStats from './components/studystats';
import Leaderboard from './components/leaderboard';
import { useRouter } from 'next/navigation';

const entries = [
  { date: '2025-11-09' },
  { date: '2025-11-10' },
  { date: '2025-11-11' },
  { date: '2025-11-13' },
  { date: '2025-11-14' },
  { date: '2025-11-15' }, // Today
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
  const router = useRouter();

    const handleGoToSignup = () => {
    router.push('/signup');
  };
  return ( 
    <main className="bg-[#E5E7EB] p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Study Dashboard</h1>
        <button 
          onClick={handleGoToSignup}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold text-white transition-colors"
        >
          Go to Sign Up
        </button>
      </div>
      <Streaks entries={entries}/>
      <StudyStats studyMinutes={120} averageStudyLength={30} />
      <Leaderboard leaderboards={leaderboardData} />
    </main>
  );
}
