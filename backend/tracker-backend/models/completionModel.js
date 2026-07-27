import db from "../config/db.js";


export async function getCompletions(taskId, year, month) {

  const [rows] = await db.query(
    `
    SELECT completed_date 
    FROM task_completion
    WHERE task_id = ?
    AND YEAR(completed_date) = ?
    AND MONTH(completed_date) = ?
    `,
    [
      taskId,
      year,
      month
    ]
  );

  return rows;
}


export async function addCompletion(taskId, date) {
  await db.query(
    "INSERT INTO task_completion (task_id, completed_date) VALUES (?, ?)",
    [taskId, date]
  );
}


export async function removeCompletion(taskId, date) {
  await db.query(
    "DELETE FROM task_completion WHERE task_id = ? AND completed_date = ?",
    [taskId, date]
  );
}