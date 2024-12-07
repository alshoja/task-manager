import { Repository } from "typeorm";
import { AppDataSource } from "../config/Db.config";
import { Tag } from "../entities/Tag.entity";
import { CreateTagDTO } from "../dto/Tag.dto";

export class TagRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  async createTag(tag: CreateTagDTO): Promise<Tag> {
    const _tag = this.repository.create(tag);
    return await this.repository.save(_tag);
  }

  async findAllTags(): Promise<Tag[]> {
    return await this.repository.find();
  }

}
