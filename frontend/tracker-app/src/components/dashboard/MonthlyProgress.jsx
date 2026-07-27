import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded border border-border-strong bg-surface-2 px-2.5 py-1.5 text-xs shadow-float">
      <p className="text-text-secondary">Day {label}</p>
      <p className="font-medium text-text-primary">
        {payload[0].value}% completed
      </p>
    </div>
  );
}

function MonthlyProgress({ tasks, daysInMonth }) {
  const data = useMemo(() => {
    const totalTasks = tasks.length;

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;

      const completed = tasks.filter((task) =>
        task.completedDays.includes(day)
      ).length;

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

  const hasTasks = tasks.length > 0;

  return (
    <div className="flex h-[260px] flex-col rounded-lg border border-border bg-surface-1 p-4">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">
        Monthly Progress
      </h3>

      {hasTasks ? (
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.06)"
              />

              <XAxis
                dataKey="day"
                tick={{ fill: "#6b6b70", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
                interval={Math.ceil(daysInMonth / 8)}
              />

              <YAxis
                tick={{ fill: "#6b6b70", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                width={32}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />

              <Bar
                dataKey="percent"
                fill="#6366f1"
                radius={[3, 3, 0, 0]}
                maxBarSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xs text-text-muted">
            Add a task to see progress
          </p>
        </div>
      )}
    </div>
  );
}

export default MonthlyProgress;