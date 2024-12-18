import { NotificationRepository } from "../repositories/Notification.repository";
import { NotificationService } from "../services/Notification.service";
import { RabbitMQService } from "../services/rbq/Rabbit.service";
import { RedisPubSubService } from "../services/redis/RedisPubsub.service";

export class NotificationServiceFactory {
    static create(): NotificationService {
        const repository = new NotificationRepository();
        const rabbitMQService = new RabbitMQService();
        const redisPubSubService = new RedisPubSubService();
        return new NotificationService(repository, rabbitMQService, redisPubSubService);
    }
}
