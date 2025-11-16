"use client";

import { useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const dailyData = [
  { label: "Mon", math: 1, cs: 2, biology: 1 },
  { label: "Tue", math: 2, cs: 1, biology: 4 },
  { label: "Wed", math: 1, cs: 3, biology: 2 },
  { label: "Thu", math: 3, cs: 1, biology: 5 },
  { label: "Fri", math: 0, cs: 2, biology: 1 },
  { label: "Sat", math: 2, cs: 2, biology: 0 },
  { label: "Sun", math: 1, cs: 1, biology: 1 },
];

const weeklyData = [
  { label: "Week 1", math: 6, cs: 9, biology: 4 },
  { label: "Week 2", math: 4, cs: 8, biology: 7 },
  { label: "Week 3", math: 5, cs: 11, biology: 6 },
  { label: "Week 4", math: 8, cs: 7, biology: 5 },
  { label: "Week 5", math: 9, cs: 6, biology: 4 },
  { label: "Week 6", math: 7, cs: 12, biology: 5 },
  { label: "Week 7", math: 10, cs: 9, biology: 8 },
  { label: "Week 8", math: 6, cs: 10, biology: 7 },
  { label: "Week 9", math: 7, cs: 8, biology: 6 },
  { label: "Week 10", math: 5, cs: 11, biology: 9 },
  { label: "Week 11", math: 8, cs: 7, biology: 6 },
  { label: "Week 12", math: 9, cs: 10, biology: 5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  // for future reference, payload exists if you are hovering over a chart element
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-1 bg-slate-900 p-3 rounded-md">
        <p className="font-semibold text-white">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value} hrs
          </p>
        ))}
        <p className="text-white text-sm">Total: {payload.reduce((a, c) => a + c.value, 0)} hrs</p>
      </div>
    );
  }
  return null;
};

export default function BarChartComponent() {
  const [view, setView] = useState("daily");
  const data = view === "daily" ? dailyData : weeklyData;

  return (
    <div className="w-full">
      {/* Toggle View Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-md cursor-pointer ${view === "daily" ? "bg-yellow-600 text-white" : "bg-stone-400/20"}`}
        >
          Daily
        </button>

        <button
          onClick={() => setView("weekly")}
          className={`px-4 py-2 rounded-md cursor-pointer ${view === "weekly" ? "bg-yellow-600 text-white" : "bg-stone-400/20"}`}
        >
          Weekly
        </button>
      </div>

      {/* Chart Container with fixed height */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            <Bar dataKey="math" fill="#3b82f6" stackId="study" name="Math" />
            <Bar dataKey="cs" fill="#10b981" stackId="study" name="CS" />
            <Bar dataKey="biology" fill="#f59e0b" stackId="study" name="Biology" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
