export default function StudyStats({ studyMinutes, averageStudyLength }) {
  return (
    <div className="bg-green-50 shadow-md hover:shadow-xl p-17 border-2 border-green-400 rounded-3xl transition-shadow">
      <h1 className="mb-6 font-bold text-2xl text-center">Study Stats</h1>
      <div className="flex justify-around items-center gap-5">
        <div className="flex-1 text-center">
          <p className="font-black text-green-600 text-7xl leading-none">
            {studyMinutes}
          </p>
          <h3 className="mt-2.5 font-semibold text-black text-sm leading-tight">
            Study Minutes
          </h3>
        </div>
        <div className="bg-black w-0.5 h-24"></div>
        <div className="flex-1 text-center">
          <p className="font-black text-green-600 text-7xl leading-none">
            {averageStudyLength}
          </p>
          <h3 className="mt-2.5 font-semibold text-black text-sm leading-tight">
            Average study time
          </h3>
        </div>
      </div>
    </div>
  );
}
