import React from 'react';
import './streaks.css';

export default function Streaks({ entries }) {
    const calculateLongestStreak = (entries) => {
        if (!entries || entries.length === 0) return 0;

        // Sort entries by date
        const sorted = [...entries].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        let currentStreak = 1;

        for (let i = 1; i < sorted.length; i++) {
            const currentDate = new Date(sorted[i].date);
            const previousDate = new Date(sorted[i - 1].date);

            // Check if dates are consecutive days
            const diffTime = currentDate - previousDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
                currentStreak++;
            } else if (diffDays > 1) {
                currentStreak = 1;
            }
        }

        return currentStreak;
    };

    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        // Create set of dates that have entries (normalized to YYYY-MM-DD)
        const entryDates = new Set(
            entries.map(entry => {
                const date = new Date(entry.date);
                // Add one day to fix timezone offset issues
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                return date.toISOString().split('T')[0];
            })
        );

        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            days.push({
                date: dateString,
                hasEntry: entryDates.has(dateString)
            });
        }

        return days;
    };

    const streak = calculateLongestStreak(entries);
    const last7Days = getLast7Days();

    return (
       
       <div className="streaks-section">
            <h2 className="streaks-title">Current Streak 🔥</h2>
            <div className="book-container">
                {last7Days.map((day, index) => (
                    <span 
                        key={index} 
                        className="book-emoji"
                        style={{ opacity: day.hasEntry ? 1 : 0.3 }}
                    >
                        📚
                    </span>
                ))}
            </div>
            <p className="streak-count">{streak} day{streak !== 1 ? 's' : ''}</p>
        </div>
    );
}