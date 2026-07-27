import { FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import ProgressBar from "./ProgressBar";

function TaskMobileCard({
  task,
  daysInMonth,
  todayDate,
  onToggleDay,
  onDeleteTask,
  onEditTaskName,
}) {
  const progress =
    daysInMonth > 0
      ? Math.round((task.completedDays.length / daysInMonth) * 100)
      : 0;

  return (
    <div className="rounded-lg border border-border bg-surface-1 p-3.5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-primary">
          {task.name}
        </h3>

        <div className="flex gap-1">
          <button
            onClick={() => onEditTaskName(task.id, task.name)}
            className="rounded p-1 text-text-secondary hover:bg-surface-3"
          >
            <FiEdit2 size={14} />
          </button>

          <button
            onClick={() => onDeleteTask(task.id)}
            className="rounded p-1 text-text-secondary hover:bg-surface-3 hover:text-red-400"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>


      {/* Progress */}
      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>


      {/* Days */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {Array.from(
          { length: daysInMonth },
          (_, index) => index + 1
        ).map((day) => {

          const completed = task.completedDays.includes(day);

          const upcoming =
            todayDate !== null && day > todayDate;

          return (
            <button
              key={day}
              disabled={upcoming}
              onClick={() => onToggleDay(task.id, day)}
              className={`
                flex h-6 w-6 items-center justify-center rounded-sm border text-xs
                transition-colors duration-150
                ${
                  completed
                    ? "border-accent bg-accent text-white"
                    : "border-border-strong hover:border-accent"
                }
                ${
                  upcoming
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }
              `}
              title={`Day ${day}`}
            >
              {completed && <FiCheck size={12} />}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export default TaskMobileCard;