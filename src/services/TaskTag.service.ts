import { CreateTaskTagDTO } from '../dto/TaskTag.dto';
import { TaskTag } from '../entities/TaskTag.entity';
import { TaskTagRepository } from '../repositories/TaskTag.repository';

export class TaskTagService {
  private taskTagRepository: TaskTagRepository

  constructor() {
    this.taskTagRepository = new TaskTagRepository();
  }

  async createTaskTag(tag: CreateTaskTagDTO): Promise<TaskTag> {
    return this.taskTagRepository.createTaskTag(tag);
  }
}