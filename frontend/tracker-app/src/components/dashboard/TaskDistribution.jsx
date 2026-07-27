import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PALETTE = [
  "#6366f1",
  "#22a5b8",
  "#c99a3f",
  "#a15fc4",
  "#5f9e6e",
  "#c4636b",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded border border-border-strong bg-surface-2 px-2.5 py-1.5 text-xs shadow-float">
      <p className="font-medium text-text-primary">
        {item.name}
      </p>
      <p className="text-text-secondary">
        {item.value} days completed
      </p>
    </div>
  );
}

function TaskDistribution({ tasks }) {
  const data = useMemo(() => {
    return tasks
      .filter((task) => task.completedDays.length > 0)
      .map((task) => ({
        name: task.name,
        value: task.completedDays.length,
      }));
  }, [tasks]);

  const hasTasks = data.length > 0;

  return (
    <div className="flex h-[260px] flex-col rounded-lg border border-border bg-surface-1 p-4">
      <h3 className="mb-3 text-sm font-semibold text-text-primary">
        Task Distribution
      </h3>

      {hasTasks ? (
        <div className="flex min-h-0 flex-1 items-center gap-2">
          {/* Chart */}
          <div className="h-full w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PALETTE[index % PALETTE.length]}
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <ul className="max-h-full w-1/2 space-y-1.5 overflow-y-auto pr-1 scrollbar-thin">
            {data.map((entry, index) => (
              <li
                key={entry.name}
                className="flex items-center gap-2 text-xs"
                aria-label={`${entry.name}: ${entry.value} days`}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      PALETTE[index % PALETTE.length],
                  }}
                />

                <span className="truncate text-text-secondary">
                  {entry.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xs text-text-muted">
            Complete a task to see distribution
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskDistribution;