import { useMemo, useState } from "react";
import MobileTaskCards from "./MobileTaskCards.jsx";
import TaskToolbar from "./TaskToolbar.jsx";
import TaskTable from "./TaskTable.jsx";

function TaskOverview({
  tasks,
  daysInMonth,
  todayDate,
  onToggleDay,
  onDeleteTask,
  onEditTaskName,
  onAddTask,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortValue, setSortValue] = useState("name");

  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((task) =>
        task.name.toLowerCase().includes(query)
      );
    }

    // Filter
    if (filterValue === "completed-today" && todayDate) {
      result = result.filter((task) =>
        task.completedDays.includes(todayDate)
      );
    }

    if (filterValue === "pending-today" && todayDate) {
      result = result.filter(
        (task) =>
          !task.completedDays.includes(todayDate)
      );
    }


    // Add progress
    const withProgress = result.map((task) => ({
      ...task,
      progress:
        daysInMonth > 0
          ? task.completedDays.length / daysInMonth
          : 0,
    }));


    // Sort
    withProgress.sort((a, b) => {
      if (sortValue === "progress-desc") {
        return b.progress - a.progress;
      }

      if (sortValue === "progress-asc") {
        return a.progress - b.progress;
      }

      return a.name.localeCompare(b.name);
    });


    return withProgress;

  }, [
    tasks,
    searchQuery,
    filterValue,
    sortValue,
    todayDate,
    daysInMonth,
  ]);


  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface-1 shadow-sm">

      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Task Overview ({visibleTasks.length})
        </h2>
      </div>


      <TaskToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onAddTask={onAddTask}
      />


      {visibleTasks.length > 0 ? (
        <>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <TaskTable
              tasks={visibleTasks}
              daysInMonth={daysInMonth}
              todayDate={todayDate}
              onToggleDay={onToggleDay}
              onDeleteTask={onDeleteTask}
              onEditTaskName={onEditTaskName}
            />
          </div>


          {/* Mobile Cards */}
          <div className="block md:hidden">
            <MobileTaskCards
  tasks={visibleTasks}
  daysInMonth={daysInMonth}
  todayDate={todayDate}
  onToggleDay={onToggleDay}
  onDeleteTask={onDeleteTask}
  onEditTaskName={onEditTaskName}
/>
          </div>

        </>
      ) : (

        <div className="flex h-48 flex-col items-center justify-center gap-3 text-center">

  <p className="text-sm font-medium text-text-primary">
    No tasks yet
  </p>

  <p className="text-xs text-text-secondary">
    Start tracking your daily habits by creating your first task.
  </p>

  <button
    type="button"
    onClick={onAddTask}
    className="rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
  >
    + Add Task
  </button>

</div>

      )}

    </section>
  );
}

export default TaskOverview;