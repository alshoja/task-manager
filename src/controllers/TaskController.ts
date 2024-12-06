import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export class TaskController {
  static async createTask(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    try {
      const task = await taskService.createTask(title, description);
      res.status(201).json(task);
    } catch (error) {
      console.log("🚀 ~ TaskController ~ createTask ~ error:", error)
      res.status(500).json({ message: 'Failed to create task', error });
    }
  }

  static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.log("🚀 ~ getAllTasks ~ createTask ~ error:", error)
      res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const task = await taskService.getTaskById(Number(id));
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch task', error });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedTask = await taskService.updateTask(Number(id), title, description);
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update task', error });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await taskService.deleteTask(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task', error });
    }
  }
}
