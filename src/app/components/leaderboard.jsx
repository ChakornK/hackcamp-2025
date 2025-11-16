"use client";

import { useState } from "react";

export default function Leaderboard({ leaderboards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? leaderboards.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === leaderboards.length - 1 ? 0 : prev + 1
    );
  };

  const currentLeaderboard = leaderboards[currentIndex];

  return (
    <div className="flex items-center gap-4">
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="font-bold hover:text-gray-600 text-4xl transition-colors"
        aria-label="Previous leaderboard"
      >
        ←
      </button>

      {/* Leaderboard Card */}
      <div className="bg-[#D1D5DB] p-8 rounded-3xl w-full max-w-md">
        <h2 className="mb-6 font-bold text-2xl text-center">
          {currentLeaderboard.title}
        </h2>

        <div className="space-y-4">
          {currentLeaderboard.data.map((entry) => (
            <div key={entry.rank} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{entry.rank}.</span>
                <span className="font-semibold text-lg">{entry.name}</span>
              </div>
              <span className="font-semibold text-lg">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="font-bold hover:text-gray-600 text-4xl transition-colors"
        aria-label="Next leaderboard"
      >
        →
      </button>
    </div>
  );
}
