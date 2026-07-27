import completionRoutes from "./routes/completionRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Test route + MySQL connection
app.get("/", async (req, res) => {
  try {
    const [result] = await db.query("SELECT 1");

    res.json({
      message: "Backend + MySQL Connected",
      result,
    });

  } catch (error) {
    console.log("MYSQL ERROR:", error);

    res.status(500).json({
      error: error.message || "Database error",
    });
  }
});


// Task API routes
app.use("/api/tasks", taskRoutes);
app.use("/api/completions", completionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});