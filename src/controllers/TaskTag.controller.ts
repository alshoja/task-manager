import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";
import { TaskTagService } from "../services/TaskTag.service";

const taskTagService = new TaskTagService();

export class TaskTagController {
    static async createTaskTag(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { task_id, tag_id } = req.body;
            const tag = await taskTagService.createTaskTag({ task_id, tag_id });
            res.status(201).json(tag);
        } catch (error: any) {
            next(new AppError('Failed to create tags', 500));
        }
    }
}


