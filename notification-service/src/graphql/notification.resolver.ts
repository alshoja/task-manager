import { NotificationServiceFactory } from "../factories/Notification.factory";

export const notificationResolvers = {
  Subscription: {
    notificationReceived: {
      subscribe: async (_: any) => {
        // const { userId } = args;
        const notificationService = NotificationServiceFactory.create();

        await notificationService.redisPubSubService.init();
        await notificationService.listenForNotifications();
        return notificationService.redisPubSubService.asyncIterator('notif')

      },
    },
  },
};
