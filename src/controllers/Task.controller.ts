import { CreateTaskDTO } from "../dto/Task.dto";
import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/Task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService
  }
  async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, description, status } = req.body as CreateTaskDTO;
    try {
      const task = await this.taskService.createTask({ title, description, status });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await this.taskService.getTaskById(Number(id));
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedTask = await this.taskService.updateTask(Number(id), title, description);
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await this.taskService.deleteTask(Number(id));
      res.status(204).json(task);
    } catch (error) {
      next(error);
    }
  }
}


