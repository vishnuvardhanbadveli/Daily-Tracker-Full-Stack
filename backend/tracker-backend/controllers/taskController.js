import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../models/taskModel.js";


export async function fetchTasks(req, res) {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


export async function addTask(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Task name required",
      });
    }

    const task = await createTask(name);

    res.json(task);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


export async function removeTask(req, res) {
  try {
    await deleteTask(req.params.id);

    res.json({
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


export async function editTask(req, res) {
  try {
    const { name } = req.body;

    await updateTask(req.params.id, name);

    res.json({
      message: "Task updated",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}