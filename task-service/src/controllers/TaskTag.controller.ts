import { NextFunction, Request, Response } from "express";
import { TaskTagService } from "../services/TaskTag.service";
;

export class TaskTagController {
    private taskTagService: TaskTagService

    constructor(taskTagService: TaskTagService) {
        this.taskTagService = taskTagService
    }
    async createTaskTag(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { task_id, tag_id } = req.body;
            const tag = await this.taskTagService.createTaskTag({ task_id, tag_id });
            res.status(201).json(tag);
        } catch (error: any) {
            next(error);
        }
    }
}


