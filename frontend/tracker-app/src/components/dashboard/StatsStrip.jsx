import { FaFire } from "react-icons/fa";

function StatItem({ label, value, accent = false, icon = null }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3.5 first:pl-0 last:pr-0">
      <span
        className={`flex items-center gap-1 text-lg font-semibold ${
          accent ? "text-accent" : "text-text-primary"
        }`}
      >
        {icon}
        {value}
      </span>

      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}

function StatsStrip({ stats }) {
  const {
    totalTasks,
    completedToday,
    monthlyCompletion,
    currentStreak,
  } = stats;

  return (
    <section className="overflow-x-auto rounded border border-border bg-surface-1">
      <div className="flex min-w-max divide-x divide-border">
        <StatItem label="Total Tasks" value={totalTasks} />
        <StatItem label="Completed Today" value={completedToday} />
        <StatItem
          label="Monthly Completion"
          value={`${monthlyCompletion}%`}
        />
        <StatItem
          label="Current Streak"
          value={currentStreak}
          accent
          icon={<FaFire size={14} />}
        />
      </div>
    </section>
  );
}

export default StatsStrip;