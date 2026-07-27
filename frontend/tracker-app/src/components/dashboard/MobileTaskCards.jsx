import { useState } from "react";
import {
  FiCheck,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

function MobileTaskCards({
  tasks,
  todayDate,
  daysInMonth,
  onToggleDay,
  onDeleteTask,
  onEditTaskName,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");


  function startEdit(task) {
    setEditingId(task.id);
    setEditName(task.name);
  }


  function saveEdit(taskId) {
    const value = editName.trim();

    if (value) {
      onEditTaskName(taskId, value);
    }

    setEditingId(null);
    setEditName("");
  }


  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }


  if (tasks.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-text-secondary">
        No tasks available
      </div>
    );
  }


  return (
    <div className="space-y-3 p-4">

      {tasks.map((task) => {

        const progress =
          daysInMonth > 0
            ? Math.round(
                (task.completedDays.length / daysInMonth) * 100
              )
            : 0;


        const completedToday =
          todayDate &&
          task.completedDays.includes(todayDate);


        return (
          <div
            key={task.id}
            className="rounded-lg border border-border bg-surface-1 p-4"
          >

            {/* Header */}
            <div className="flex items-center justify-between gap-3">

              {editingId === task.id ? (

                <input
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  className="flex-1 rounded border border-border bg-surface-0 px-2 py-1 text-sm text-text-primary focus:outline-none"
                  autoFocus
                />

              ) : (

                <h3 className="text-sm font-medium text-text-primary">
                  {task.name}
                </h3>

              )}


              <div className="flex gap-1">

                {editingId === task.id ? (

                  <>
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="flex h-7 w-7 items-center justify-center rounded text-accent hover:bg-surface-3"
                    >
                      <FiCheck size={14} />
                    </button>


                    <button
                      onClick={cancelEdit}
                      className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface-3"
                    >
                      <FiX size={14} />
                    </button>
                  </>

                ) : (

                  <button
                    onClick={() => startEdit(task)}
                    className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface-3"
                  >
                    <FiEdit2 size={14} />
                  </button>

                )}


                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      `Delete "${task.name}"?`
                    );

                    if (confirmDelete) {
                      onDeleteTask(task.id);
                    }
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded text-red-400 hover:bg-surface-3"
                >
                  <FiTrash2 size={14} />
                </button>

              </div>

            </div>


            {/* Progress + Checkbox */}
            <div className="mt-4 flex items-center gap-3">

              <div className="flex-1">

                <div className="mb-1 flex justify-between">

                  <span className="text-xs text-text-secondary">
                    Progress
                  </span>

                  <span className="text-xs text-text-secondary">
                    {progress}%
                  </span>

                </div>


                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">

                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>


              <button
                onClick={() =>
                  onToggleDay(
                    task.id,
                    todayDate
                  )
                }
                disabled={!todayDate}
                className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                  completedToday
                    ? "border-accent bg-accent text-white"
                    : "border-border hover:bg-surface-3"
                }`}
              >
                {completedToday && (
                  <FiCheck size={16} />
                )}
              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default MobileTaskCards;