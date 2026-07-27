import { useEffect, useMemo, useState } from "react";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleCompletion,
  getCompletions,
} from "../services/taskService";
import Header from "../layout/Header";

import StatsStrip from "../components/dashboard/StatsStrip";
import TaskOverview from "../components/dashboard/TaskOverview";
import MonthlyProgress from "../components/dashboard/MonthlyProgress";
import TaskDistribution from "../components/dashboard/TaskDistribution";
import MonthlyHeatmap from "../components/dashboard/MonthlyHeatmap";
import AddTaskModal from "../components/dashboard/AddTaskModal";

import { getDaysInMonth, getMonthLabel } from "../utils/dateUtils";



function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
 async function loadTasks() {
  try {
    setLoading(true);
    setError("");

    const data = await getTasks();

    const tasksWithCompletion = await Promise.all(
      data.map(async (task) => {
        const completions = await getCompletions(
          task.id,
          currentDate.getFullYear(),
          currentDate.getMonth() + 1
        );

        const completedDays = completions.map((item) =>
          new Date(item.completed_date).getDate()
        );

        return {
          ...task,
          completedDays,
        };
      })
    );

    setTasks(tasksWithCompletion);

  } catch (error) {
    console.error(error);
    setError("Unable to load tasks. Check backend connection.");

  } finally {
    setLoading(false);
  }
}
useEffect(() => {
  loadTasks();
}, [currentDate]);
  const daysInMonth = getDaysInMonth(currentDate)
  const today = new Date()
  const isCurrentMonthView =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  const todayDate = isCurrentMonthView ? today.getDate() : null

  function handlePrevMonth() {
  setCurrentDate((prev) =>
    new Date(
      prev.getFullYear(),
      prev.getMonth() - 1,
      1
    )
  );
}

 function handleNextMonth() {
  setCurrentDate((prev) =>
    new Date(
      prev.getFullYear(),
      prev.getMonth() + 1,
      1
    )
  );
} 

  function handleOpenAddTask() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

 async function handleCreateTask(name) {
  try {

    await addTask(name);

    await loadTasks();

    setIsModalOpen(false);

  } catch (error) {
    console.error("Failed to create task:", error);
  }
}

   async function handleToggleDay(taskId, day) {
  try {

    const task = tasks.find(
      (item) => item.id === taskId
    );

    const completed =
      !task.completedDays.includes(day);


    await toggleCompletion(
      taskId,
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      completed
    );


    await loadTasks();


  } catch(error) {

    console.error(
      "Completion update failed:",
      error
    );

  }
}
async function handleDeleteTask(taskId) {
  try {
    await deleteTask(taskId);

    await loadTasks();

  } catch (error) {
    console.error(
      "Failed to delete task:",
      error
    );
  }
}


async function handleEditTaskName(taskId, name) {
  try {
    await updateTask(taskId, name);

    await loadTasks();

  } catch (error) {
    console.error(
      "Failed to update task:",
      error
    );
  }
}
  // Derived stats — recomputed only when tasks or the visible month change.
  const stats = useMemo(() => {
    const totalTasks = tasks.length

    const completedToday = todayDate
      ? tasks.filter((t) => t.completedDays.includes(todayDate)).length
      : 0

    const totalPossible = totalTasks * daysInMonth
    const totalCompleted = tasks.reduce((sum, t) => sum + t.completedDays.length, 0)
    const monthlyCompletion = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0

    // Streak: consecutive days up to today where every task was completed.
    let currentStreak = 0
    if (todayDate && totalTasks > 0) {
      for (let day = todayDate; day >= 1; day -= 1) {
        const allDone = tasks.every((t) => t.completedDays.includes(day))
        if (!allDone) break
        currentStreak += 1
      }
    }

    return { totalTasks, completedToday, monthlyCompletion, currentStreak }
  }, [tasks, todayDate, daysInMonth])
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-0 text-text-secondary">
      Loading tracker...
    </div>
  );
}


if (error) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-0 text-red-400">
      {error}
    </div>
  );
}
return (
  <>
    <Header
      monthLabel={getMonthLabel(currentDate)}
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}
      onAddTask={handleOpenAddTask}
    />

    <StatsStrip stats={stats} />

    <TaskOverview
      tasks={tasks}
      daysInMonth={daysInMonth}
      todayDate={todayDate}
      onToggleDay={handleToggleDay}
      onDeleteTask={handleDeleteTask}
      onEditTaskName={handleEditTaskName}
      onAddTask={handleOpenAddTask}
    />
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <MonthlyProgress tasks={tasks} daysInMonth={daysInMonth} />
      <TaskDistribution tasks={tasks} />
      <MonthlyHeatmap
        tasks={tasks}
        daysInMonth={daysInMonth}
        todayDate={todayDate}
      />
    </section>

    <AddTaskModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onCreate={handleCreateTask}
    />
  </>
);  
}

export default Dashboard