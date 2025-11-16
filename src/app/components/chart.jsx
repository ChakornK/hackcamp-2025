"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-1 bg-slate-900 p-3 rounded-md">
        <p className="font-semibold text-white">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {(entry.value / 3600).toFixed(1)} hrs
          </p>
        ))}
        <p className="text-white text-sm">
          Total: {(payload.reduce((a, c) => a + c.value, 0) / 3600).toFixed(1)} hrs
        </p>
      </div>
    );
  }
  return null;
};

// Helper function to get the week number
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

// Helper function to get day of week label
function getDayLabel(dateString) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateString);
  return days[date.getDay()];
}

// Color palette for subjects
const subjectColors = {
  "Math": "#3b82f6",
  "Computer Science": "#10b981",
  "Biology": "#f59e0b",
};

export default function BarChartComponent({ token }) {
  const [view, setView] = useState("daily");
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    // Fetch user data from API
    fetch("http://localhost:3000/api/user/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        processData(data.records);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user stats:", error);
        setLoading(false);
      });
  }, [token]);

  const processData = (records) => {
    if (!records || records.length === 0) {
      setData([]);
      setSubjects([]);
      return;
    }

    // Get all unique subjects
    const allSubjects = new Set();
    records.forEach(record => {
      if (record.subjects) {
        record.subjects.forEach(s => allSubjects.add(s.subject));
      }
    });
    setSubjects(Array.from(allSubjects));

    // Process daily data (last 7 days)
    const dailyData = processDaily(records, allSubjects);
    
    // Process weekly data (last 12 weeks)
    const weeklyData = processWeekly(records, allSubjects);

    // Store both in state
    setData({ daily: dailyData, weekly: weeklyData });
  };

  const processDaily = (records, allSubjects) => {
    const today = new Date();
    const last7Days = [];

    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayData = {
        label: getDayLabel(dateString),
        date: dateString
      };

      // Initialize all subjects to 0
      allSubjects.forEach(subject => {
        dayData[subject.toLowerCase().replace(/\s+/g, '_')] = 0;
      });

      // Find matching record
      const record = records.find(r => r.date === dateString);
      if (record && record.subjects) {
        record.subjects.forEach(s => {
          const key = s.subject.toLowerCase().replace(/\s+/g, '_');
          dayData[key] = s.duration / 3600; // Convert to hours
        });
      }

      last7Days.push(dayData);
    }

    return last7Days;
  };

  const processWeekly = (records, allSubjects) => {
    const today = new Date();
    const weeklyData = [];

    // Generate last 12 weeks
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - (i * 7) - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekData = {
        label: `Week ${getWeekNumber(weekStart)}`,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0]
      };

      // Initialize all subjects to 0
      allSubjects.forEach(subject => {
        weekData[subject.toLowerCase().replace(/\s+/g, '_')] = 0;
      });

      // Sum up all days in this week
      for (let d = 0; d < 7; d++) {
        const currentDay = new Date(weekStart);
        currentDay.setDate(weekStart.getDate() + d);
        const dateString = currentDay.toISOString().split('T')[0];

        const record = records.find(r => r.date === dateString);
        if (record && record.subjects) {
          record.subjects.forEach(s => {
            const key = s.subject.toLowerCase().replace(/\s+/g, '_');
            weekData[key] += s.duration / 3600; // Convert to hours
          });
        }
      }

      weeklyData.push(weekData);
    }

    return weeklyData;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <p>Loading data...</p>
      </div>
    );
  }

  if (!data.daily || data.daily.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <p>No data available. Start tracking your study time!</p>
      </div>
    );
  }

  const chartData = view === "daily" ? data.daily : data.weekly;

  return (
    <div className="w-full">
      {/* Toggle View Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            view === "daily" ? "bg-yellow-600 text-white" : "bg-stone-400/20"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setView("weekly")}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            view === "weekly" ? "bg-yellow-600 text-white" : "bg-stone-400/20"
          }`}
        >
          Weekly
        </button>
      </div>
      {/* Chart Container with fixed height */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {subjects.map((subject) => {
              const key = subject.toLowerCase().replace(/\s+/g, '_');
              const color = subjectColors[subject] || "#6b7280";
              return (
                <Bar 
                  key={subject}
                  dataKey={key} 
                  fill={color} 
                  stackId="study" 
                  name={subject}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}