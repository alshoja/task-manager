import { Repository } from "typeorm";
import { Notification } from "../entities/Notification.entity";
import { AppDataSource } from "../config/Db.config";
import { CreateNotificationDTO } from "../dto/Notification.dto";

export class NotificationRepository {
  private repository: Repository<Notification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Notification);
  }

  async createNotification(notification: CreateNotificationDTO): Promise<Notification> {
    const _notification = this.repository.create(notification);
    return await this.repository.save(_notification);
  }

  async findAllNotifications(): Promise<Notification[]> {
    return await this.repository.find();
  }

  async findNotificationById(id: number): Promise<Notification | null> {
    return await this.repository.findOneBy({ id });
  }

  async deleteNotification(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
