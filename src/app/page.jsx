import Streaks from './components/streaks';
import StudyStats from './components/studystats';


const entries = [
  { date: '2025-11-09' },
  { date: '2025-11-10' },
  { date: '2025-11-11' },
  { date: '2025-11-13' },
  { date: '2025-11-14' },
  { date: '2025-11-15' }, // Today
];

export default function Home() {
  return (
    <main>
      <p>
        <Streaks entries={entries}/>
        <StudyStats studyMinutes={120} averageStudyLength={30} />
        </p>
      
    </main>
  );
}
