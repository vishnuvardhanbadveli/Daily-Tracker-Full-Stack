import db from "../config/db.js";

export async function getAllTasks() {
  const [rows] = await db.query(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );

  return rows;
}


export async function createTask(name) {
  const [result] = await db.query(
    "INSERT INTO tasks (name) VALUES (?)",
    [name]
  );

  return {
    id: result.insertId,
    name,
  };
}


export async function deleteTask(id) {
  await db.query(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
}


export async function updateTask(id, name) {
  await db.query(
    "UPDATE tasks SET name = ? WHERE id = ?",
    [name, id]
  );
}