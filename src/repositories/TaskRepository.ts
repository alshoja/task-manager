import { CreateTaskDTO } from "./../dto/CreateTaskDTO";
import { Repository } from "typeorm";
import { Task } from "../entities/Task";
import { AppDataSource } from "../config/db";

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    const _task = this.repository.create(task);
    return await this.repository.save(_task);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.repository.find();
  }

  async findTaskById(id: number): Promise<Task | null> {
    return await this.repository.findOneBy({ id });
  }

  async updateTask(
    id: number,
    title: string,
    description: string
  ): Promise<Task | null> {
    await this.repository.update(id, { title, description });
    return await this.findTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
