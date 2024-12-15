import { CreateNotificationDTO } from "../dto/Notification.dto";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";
import { NotificationRepository } from "../repositories/Notification.repository";
import { Notification } from "../entities/Notification.entity";

export class NotificationService {
  private notificationRepository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository
  }

  async createNotification(notification: CreateNotificationDTO): Promise<Notification> {
    return this.notificationRepository.createNotification(notification);
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationRepository.findAllNotifications();
  }

  async getNotificationById(id: number): Promise<Notification | null> {
    const notification = this.notificationRepository.findNotificationById(id);
    if (!notification) throw new AppError("Notification not found", 404)
    return notification
  }

  async deleteNotification(id: number): Promise<void> {
    const notification = this.notificationRepository.findNotificationById(id);
    if (!notification) throw new AppError("Notification not found", 404)
    return this.notificationRepository.deleteNotification(id);
  }
}

