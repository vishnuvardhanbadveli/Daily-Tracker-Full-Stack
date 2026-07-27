import express from "express";

import {
  fetchTasks,
  addTask,
  removeTask,
  editTask,
} from "../controllers/taskController.js";


const router = express.Router();


router.get("/", fetchTasks);

router.post("/", addTask);

router.delete("/:id", removeTask);

router.put("/:id", editTask);


export default router;