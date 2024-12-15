import { UserRepository } from './../repositories/User.repository';
import { TaskRepository } from '../repositories/Task.repository';
import { Task } from '../entities/Task.entity';
import { CreateTaskDTO } from '../dto/Task.dto';
import { AppError } from '../middlewares/GlobalErrorHandler.middleware';
import { RabbitMQService } from './rbq/Rabbit.service';

export class TaskService {
  private taskRepository: TaskRepository
  private userRepository: UserRepository
  private rabbitMQService: RabbitMQService;

  constructor(taskRepository: TaskRepository, userRepository: UserRepository, rabbitMQService: RabbitMQService) {
    this.taskRepository = taskRepository
    this.userRepository = userRepository
    this.rabbitMQService = rabbitMQService;
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    const _user = await this.userRepository.findUserById(task.user_id);
    if (!_user) throw new AppError("User not found", 404)
    const _task = await this.taskRepository.createTask(task);
    const notificationPayload = {
      user_id: _task.user_id,
      title: 'Task Created',
      message: `Task "${task.title}" has been created.`,
      task_id: _task.id,
    };
    await this.rabbitMQService.sendToQueue('task_created', JSON.stringify(notificationPayload));
    return _task
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

