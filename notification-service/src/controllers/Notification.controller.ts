
import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services/Notification.service";
import { CreateNotificationDTO } from "../dto/Notification.dto";

export class NotificationController {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService
  }
  async createNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, user_id, message } = req.body as CreateNotificationDTO;
    try {
      const notification = await this.notificationService.createNotification({ title, user_id, message });
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }

  async getAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await this.notificationService.getAllNotifications();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getNotificationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await this.notificationService.getNotificationById(Number(id));
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const task = await this.notificationService.deleteNotification(Number(id));
      res.status(204).json(task);
    } catch (error) {
      next(error);
    }
  }
}


