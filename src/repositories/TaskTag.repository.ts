import { Repository } from "typeorm";
import { AppDataSource } from "../config/Db.config";
import { CreateTaskTagDTO } from "../dto/TaskTag.dto";
import { TaskTag } from "../entities/TaskTag.entity";

export class TaskTagRepository {
  private repository: Repository<TaskTag>;

  constructor() {
    this.repository = AppDataSource.getRepository(TaskTag);
  }

  async createTaskTag(tag: CreateTaskTagDTO): Promise<TaskTag> {
    const _tag = this.repository.create(tag);
    return await this.repository.save(_tag);
  }

}
