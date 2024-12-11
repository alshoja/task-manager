import { TaskRepository } from '../repositories/Task.repository';
import { Task } from '../entities/Task.entity';
import { CreateTaskDTO } from '../dto/Task.dto';
import { AppError } from '../middlewares/GlobalErrorHandler.middleware';

export class TaskService {
  private taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = this.taskRepository.findTaskById(id);
    if (!task) throw new AppError("Task not found", 404)
    return task
  }

  async updateTask(id: number, title: string, description: string): Promise<Task | null> {
    const updatedTask = this.taskRepository.updateTask(id, title, description);
    if (!updatedTask) throw new AppError("Task not found", 404)
    return updatedTask
  }

  async deleteTask(id: number): Promise<void> {
    const task = this.taskRepository.findTaskById(id);
    if (!task) throw new AppError("Task not found", 404)
    return this.taskRepository.deleteTask(id);
  }
}

