import express from "express";

import {
  toggleCompletion,
  fetchCompletions,
} from "../controllers/completionController.js";


const router = express.Router();


router.post("/", toggleCompletion);

router.get(
  "/:taskId/:year/:month",
  fetchCompletions
);

export default router;