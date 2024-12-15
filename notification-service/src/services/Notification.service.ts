import { CreateNotificationDTO } from "../dto/Notification.dto";
import { AppError } from "../middlewares/GlobalErrorHandler.middleware";
import { NotificationRepository } from "../repositories/Notification.repository";
import { Notification } from "../entities/Notification.entity";
import { RabbitMQService } from "./rbq/Rabbit.service";

export class NotificationService {
  private notificationRepository: NotificationRepository
  private rabbitMQService: RabbitMQService;

  constructor(notificationRepository: NotificationRepository, rabbitMQService: RabbitMQService) {
    this.rabbitMQService = rabbitMQService;
    this.notificationRepository = notificationRepository
  }
  async listenForNotifications(): Promise<void> {
    await this.rabbitMQService.consumeFromQueue('task_created', async (msg) => {
      if (!msg) return;

      try {
        const notificationData: CreateNotificationDTO = JSON.parse(msg.content.toString());
        await this.notificationRepository.createNotification({
          user_id: notificationData.user_id,
          title: notificationData.title,
          message: notificationData.message,
        });

        console.log('Notification processed:', notificationData);

        this.rabbitMQService.acknowledgeMessage(msg);
      } catch (error) {
        console.error('Failed to process notification:', error);
        this.rabbitMQService.rejectMessage(msg, true);
      }
    });
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

