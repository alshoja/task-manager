import express from "express";
import { createTask, getTasks, updateTask } from "../services/TaskService";

const router = express.Router();

router.get("/tasks", async (_req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = await createTask(title, description);
  res.status(201).json(task);
});

router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTask = await updateTask(parseInt(id), status);
  res.json(updatedTask);
});

export default router;
