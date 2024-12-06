import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../entities/Task';

export class TaskService {
  private taskRepository: TaskRepository
  
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(title: string, description?: string): Promise<Task> {
    return this.taskRepository.createTask(title, description);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.findTaskById(id);
  }

  async updateTask(id: number, title: string, description: string): Promise<Task | null>{
    return this.taskRepository.updateTask(id, title, description);
  }

  async deleteTask(id: number): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }
}

