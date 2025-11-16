"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ---------- DATA ----------
const dailyData = [
  { label: "Mon", time: 1 },
  { label: "Tue", time: 7 },
  { label: "Wed", time: 2 },
  { label: "Thu", time: 9 },
  { label: "Fri", time: 0 },
  { label: "Sat", time: 4 },
  { label: "Sun", time: 3 },
];

const weeklyData = [
  { label: "Week 1", time: 12 },
  { label: "Week 2", time: 18 },
  { label: "Week 3", time: 9 },
  { label: "Week 4", time: 15 },
  { label: "Week 5", time: 22 },
  { label: "Week 6", time: 28 },
  { label: "Week 7", time: 32 },
  { label: "Week 8", time: 26 },
  { label: "Week 9", time: 34 },
  { label: "Week 10", time: 31 },
  { label: "Week 11", time: 29 },
  { label: "Week 12", time: 35 },
];

// ---------- CUSTOM TOOLTIP ----------
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-slate-900 p-3 rounded-md">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-blue-400 text-sm">
          Time: <span className="ml-1">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// ---------- MAIN COMPONENT ----------
export default function BarChartComponent() {
  const [view, setView] = useState("daily"); // "daily" or "weekly"
  const data = view === "daily" ? dailyData : weeklyData;

  return (
    <div className="w-full">
      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-md ${
            view === "daily" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Daily
        </button>

        <button
          onClick={() => setView("weekly")}
          className={`px-4 py-2 rounded-md ${
            view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Weekly
        </button>
      </div>

      {/* Chart Container (must have fixed height) */}
        <ResponsiveContainer width={1000} height={600}>
          <LineChart data={data} margin={{ right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
