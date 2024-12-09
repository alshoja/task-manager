import { NextFunction, Request, Response } from "express";
import { TagService } from "../services/Tag.service";

const tagService = new TagService();

export class TagController {
  static async createTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;
      const tag = await tagService.createTag({ name });
      res.status(201).json(tag);
    } catch (error: any) {
      next(error);
    }
  }

  static async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await tagService.getAllTags();
      res.status(200).json(tags);
    } catch (error: any) {
      next(error);
    }
  }
}


