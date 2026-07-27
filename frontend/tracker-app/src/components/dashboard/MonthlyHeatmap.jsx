import { useMemo } from "react";

function getIntensityClass(percent, hasTasks) {
  if (!hasTasks || percent === 0) return "bg-surface-3";
  if (percent < 25) return "bg-accent/25";
  if (percent < 50) return "bg-accent/50";
  if (percent < 75) return "bg-accent/75";

  return "bg-accent";
}

function MonthlyHeatmap({ tasks, daysInMonth, todayDate }) {
  const hasTasks = tasks.length > 0;

  const days = useMemo(() => {
    const totalTasks = tasks.length;

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;

      const completed = tasks.reduce(
        (count, task) =>
          count + (task.completedDays.includes(day) ? 1 : 0),
        0
      );

      const percent =
        totalTasks > 0
          ? Math.round((completed / totalTasks) * 100)
          : 0;

      return {
        day,
        percent,
      };
    });
  }, [tasks, daysInMonth]);

  return (
    <div className="flex h-[260px] flex-col rounded-lg border border-border bg-surface-1 p-4">
      <h3 className="mb-4 text-sm font-semibold text-text-primary">
        Monthly Heatmap
      </h3>

      {/* Heatmap */}
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-7 gap-1.5">
          {days.map(({ day, percent }) => (
            <div
              key={day}
              title={`Day ${day}: ${percent}% completed`}
              role="img"
              aria-label={`Day ${day}: ${percent}% completed`}
              className={`
                h-5 w-5 rounded-sm
                ${getIntensityClass(percent, hasTasks)}
                ${
                  day === todayDate
                    ? "ring-1 ring-accent ring-offset-1 ring-offset-surface-1"
                    : ""
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="text-xs text-text-muted">
          Less
        </span>

        <span className="h-2.5 w-2.5 rounded-sm bg-surface-3" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent/25" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent/50" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent/75" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent" />

        <span className="text-xs text-text-muted">
          More
        </span>
      </div>
    </div>
  );
}

export default MonthlyHeatmap;