import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";
import { TagService } from "../services/Tag.service";

const tagService = new TagService();

export class TagController {
  static async createTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;
      const tag = await tagService.createTag({ name });
      res.status(201).json(tag);
    } catch (error: any) {
      next(new AppError('Failed to create tags', 500));
    }
  }

  static async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await tagService.getAllTags();
      res.status(200).json(tags);
    } catch (error: any) {
      next(new AppError('Failed to fetch tags', 500));
    }
  }
}


