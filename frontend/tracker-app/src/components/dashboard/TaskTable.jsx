import { useState } from 'react'
import { FiCheck, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import ProgressBar from './ProgressBar.jsx'
import TaskMobileCard from './TaskMobileCard.jsx'

function DayCell({ day, isCompleted, isToday, isUpcoming, onToggle }) {
  if (isUpcoming) {
    return (
      <td className="w-8 min-w-8 text-center py-2">
        <span className="mx-auto block h-4 w-4 rounded-sm border border-dashed border-upcoming" />
      </td>
    )
  }

  return (
    <td className={`w-8 min-w-8 text-center py-2 ${isToday ? "bg-today" : ""}`}>
      <button
        type="button"
        disabled={isUpcoming}
        onClick={onToggle}
        aria-label={`Day ${day}${isCompleted ? ", completed" : ", not completed"}`}
        className={`mx-auto flex h-4 w-4 items-center justify-center rounded-sm border transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${
          isCompleted
            ? "bg-accent border-accent text-white"
            : "border-border-strong hover:border-accent"
        }`}
      >
        {isCompleted && <FiCheck size={11} strokeWidth={3} />}
      </button>
    </td>
  )
}
function TaskRow({ task, daysInMonth, todayDate, onToggleDay, onDeleteTask, onEditTaskName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(task.name)

  const progress = daysInMonth > 0 ? Math.round((task.completedDays.length / daysInMonth) * 100) : 0

  function commitEdit() {
    const trimmed = draftName.trim()
    if (trimmed && trimmed !== task.name) {
      onEditTaskName(task.id, trimmed)
    } else {
      setDraftName(task.name)
    }
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraftName(task.name)
    setIsEditing(false)
  }

  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors duration-150 ease-out">
      <td className="sticky left-0 z-10 bg-surface-1 px-4 py-2 min-w-[200px] max-w-[240px] border-r border-border">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
  autoFocus
  value={draftName}
  onBlur={commitEdit}
  onChange={(e) => setDraftName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') cancelEdit()
  }}
  className="w-full rounded border border-border-strong bg-surface-0 px-2 py-1 text-sm text-text-primary focus:outline-none"
/>
            <button
              type="button"
              onClick={commitEdit}
              aria-label="Save name"
              className="text-accent hover:text-accent-hover shrink-0"
            >
              <FiCheck size={14} />
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel edit"
              className="text-text-muted hover:text-text-primary shrink-0"
            >
              <FiX size={14} />
            </button>
          </div>
        ) : (
          <span className="text-sm text-text-primary truncate block">{task.name}</span>
        )}
      </td>

      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
        <DayCell
          key={day}
          day={day}
          isCompleted={task.completedDays.includes(day)}
          isToday={day === todayDate}
          isUpcoming={todayDate !== null && day > todayDate}
          onToggle={() => onToggleDay(task.id, day)}
        />
      ))}

      <td className="min-w-[140px] px-4 py-2">
        <ProgressBar value={progress} />
      </td>

      <td className="px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${task.name}`}
            className="flex h-7 w-7 items-center justify-center rounded text-text-secondary transition-colors duration-150 ease-out hover:bg-surface-3 hover:text-text-primary"
          >
            <FiEdit2 size={13} />
          </button>
          <button
  type="button"
  onClick={() => {
    const confirmDelete = window.confirm(
      `Delete "${task.name}"?`
    );

    if (confirmDelete) {
      onDeleteTask(task.id);
    }
  }}
  aria-label={`Delete ${task.name}`}
  className="flex h-7 w-7 items-center justify-center rounded text-text-secondary transition-colors duration-150 ease-out hover:bg-surface-3 hover:text-red-400"
>
  <FiTrash2 size={13} />
</button>
        </div>
      </td>
    </tr>
  )
}

function TaskTable({ tasks, daysInMonth, todayDate, onToggleDay, onDeleteTask, onEditTaskName }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="text-sm text-text-secondary">No tasks match your current filters.</p>
      </div>
    )
  }

return (
  <>
    {/* Mobile Cards */}
    <div className="space-y-3 p-4 md:hidden">
      {tasks.map((task) => (
    <TaskMobileCard
  key={task.id}
  task={task}
  daysInMonth={daysInMonth}
  todayDate={todayDate}
  onToggleDay={onToggleDay}
  onDeleteTask={onDeleteTask}
  onEditTaskName={onEditTaskName}
/>
      ))}
    </div>


    {/* Desktop Table */}
    <div className="hidden max-h-[600px] overflow-auto scrollbar-thin md:block">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-20">
          <tr className="border-b border-border bg-surface-1">
            <th className="sticky left-0 z-30 min-w-[200px] border-r border-border bg-surface-1 px-4 py-2.5 text-left text-xs font-medium text-text-secondary">
              Task
            </th>

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
              (day) => (
                <th
                  key={day}
                  className={`w-8 min-w-8 py-2.5 text-center text-xs font-medium ${
                    day === todayDate
                      ? "bg-today text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  {day}
                </th>
              )
            )}

            <th className="min-w-[140px] px-4 py-2.5 text-left text-xs font-medium text-text-secondary">
              Progress
            </th>

            <th className="min-w-[80px] px-3 py-2.5 text-left text-xs font-medium text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              daysInMonth={daysInMonth}
              todayDate={todayDate}
              onToggleDay={onToggleDay}
              onDeleteTask={onDeleteTask}
              onEditTaskName={onEditTaskName}
            />
          ))}
        </tbody>
      </table>
    </div>
  </>
)
        
}

export default TaskTable