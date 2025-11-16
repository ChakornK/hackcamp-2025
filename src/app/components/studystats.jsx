import './studystats.css';

export default function StudyStats({ studyMinutes, averageStudyLength }) {
    return (
        <div className="study-stats">
            <h1 className="study-stats-title">Study Stats</h1>
            <div className="stats-container">
                <div className="stat-item">
                    <p className="stat-value">{studyMinutes}</p>
                    <h3 className="stat-label">Study Minutes</h3>
                </div>
                <div className="vertical-divider"></div>
                <div className="stat-item">
                    <p className="stat-value">{averageStudyLength}</p>
                    <h3 className="stat-label">Average study length</h3>
                </div>
            </div>
        </div>
    );
}