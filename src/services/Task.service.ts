import { TaskRepository } from '../repositories/Task.repository';
import { Task } from '../entities/Task.entity';
import { CreateTaskDTO } from '../dto/Task.dto';

export class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(task);
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

