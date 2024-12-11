import { TagService } from './../services/Tag.service';
import { NextFunction, Request, Response } from "express";


export class TagController {
  private tagService: TagService

  constructor(tagService: TagService) {
    this.tagService = tagService
  }

  async createTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;
      const tag = await this.tagService.createTag({ name });
      res.status(201).json(tag);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await this.tagService.getAllTags();
      res.status(200).json(tags);
    } catch (error: any) {
      next(error);
    }
  }
}


