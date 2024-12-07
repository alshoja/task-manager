import { CreateTaskDTO } from "../dto/Task.dto";
import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/Task.service";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";

const taskService = new TaskService();

export class TaskController {
  static async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, description, status } = req.body as CreateTaskDTO;
    try {
      const task = await taskService.createTask({ title, description, status });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await taskService.getTaskById(Number(id));
      if (!task) throw new AppError("Task not found", 404)
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedTask = await taskService.updateTask(
        Number(id),
        title,
        description
      );
      if (!updatedTask) throw new AppError("Task not found", 404)
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await taskService.deleteTask(Number(id));
      res.status(204).json(task);
    } catch (error) {
      next(error);
    }
  }
}


