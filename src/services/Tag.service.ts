import { CreateTagDTO } from '../dto/Tag.dto';
import { Tag } from '../entities/Tag.entity';
import { TagRepository } from '../repositories/Tag.repository';

export class TagService {
  private tagRepository: TagRepository

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  async createTag(tag: CreateTagDTO): Promise<Tag> {
    return this.tagRepository.createTag(tag);
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagRepository.findAllTags();
  }
}

