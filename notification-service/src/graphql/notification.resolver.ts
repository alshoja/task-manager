import { NotificationRepository } from '../repositories/Notification.repository';
import { NotificationService } from '../services/Notification.service';
import { RabbitMQService } from '../services/rbq/Rabbit.service';
import { RedisPubSubService } from '../services/redis/RedisPubsub.service';
import { _pubSub } from '../utils/pubsub';

export const notificationResolvers = {
  Subscription: {
    notificationReceived: {
      subscribe: async (_: any) => {
        // const { userId } = args;
        const repository = new NotificationRepository();
        const rabbitMQService = new RabbitMQService();
        const redisPubSubService = new RedisPubSubService();
        const notificationService = new NotificationService(repository, rabbitMQService, redisPubSubService);
        await redisPubSubService.init();
        await notificationService.listenForNotifications();
        return redisPubSubService.asyncIterator('notif')

      },
    },
  },
};
