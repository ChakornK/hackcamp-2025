export default function StudyStats({ studyMinutes, averageStudyLength }) {
  return (
    <div className="bg-[#D1D5DB] p-8 rounded-3xl">
      <h1 className="mb-6 font-bold text-2xl text-center">Study Stats</h1>
      <div className="flex justify-around items-center gap-5">
        <div className="flex-1 text-center">
          <p className="font-black text-black text-7xl leading-none">
            {studyMinutes}
          </p>
          <h3 className="mt-2.5 font-semibold text-black text-sm leading-tight">
            Study Minutes
          </h3>
        </div>
        <div className="bg-black w-0.5 h-24"></div>
        <div className="flex-1 text-center">
          <p className="font-black text-black text-7xl leading-none">
            {averageStudyLength}
          </p>
          <h3 className="mt-2.5 font-semibold text-black text-sm leading-tight">
            Average study length
          </h3>
        </div>
      </div>
    </div>
  );
}
