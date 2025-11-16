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
  const entryCount = currentLeaderboard.data.length;

  return (
    <div className="flex items-center gap-4 h-full">
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="flex-shrink-0 font-bold hover:text-gray-600 text-4xl transition-colors"
        aria-label="Previous leaderboard"
      >
        ←
      </button>

      {/* Leaderboard Card */}
      <div className="flex flex-col flex-1 bg-purple-50 shadow-md hover:shadow-xl p-8 border-2 border-purple-400 rounded-3xl min-w-0 h-full transition-shadow">
        <h2 className="mb-6 font-bold text-2xl text-center">
          {currentLeaderboard.title}
        </h2>

        {entryCount === 0 ? (
          // No friends message
          <div className="flex flex-1 justify-center items-center">
            <div className="px-4 text-center">
              <p className="mb-2 font-semibold text-lg">No friends yet!</p>
              <p className="text-gray-600 text-sm">
                Scan QR codes of other users to add friends!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Leaderboard entries */}
            <div className="flex-1 space-y-4 min-w-0">
              {currentLeaderboard.data.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex justify-between items-center gap-4 min-w-0"
                >
                  <div className="flex flex-1 items-center gap-3 min-w-0 overflow-hidden">
                    <span className="flex-shrink-0 font-bold text-lg">
                      {entry.rank}.
                    </span>
                    <span className="font-semibold text-lg truncate">
                      {entry.name}
                    </span>
                  </div>
                  <span className="flex-shrink-0 font-semibold text-lg whitespace-nowrap">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Add friends message if less than 5 friends */}
            {entryCount < 5 && (
              <div className="mt-6 pt-4 border-purple-200 border-t-2">
                <p className="text-gray-600 text-sm text-center">
                  Keep scanning QR codes of other users to add more friends!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="flex-shrink-0 font-bold hover:text-gray-600 text-4xl transition-colors"
        aria-label="Next leaderboard"
      >
        →
      </button>
    </div>
  );
}
