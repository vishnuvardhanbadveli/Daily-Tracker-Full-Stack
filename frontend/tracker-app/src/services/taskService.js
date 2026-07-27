import api from "./api";


export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data;
}


export async function addTask(name) {
  const response = await api.post("/tasks", {
    name,
  });

  return response.data;
}


export async function deleteTask(id) {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
}


export async function updateTask(id, name) {
  const response = await api.put(`/tasks/${id}`, {
    name,
  });

  return response.data;
}


export async function toggleCompletion(taskId, date, completed) {
  const response = await api.post("/completions", {
    taskId,
    date,
    completed,
  });

  return response.data;
}


export async function getCompletions(taskId, year, month) {
  const response = await api.get(
    `/completions/${taskId}/${year}/${month}`
  );

  return response.data;
}