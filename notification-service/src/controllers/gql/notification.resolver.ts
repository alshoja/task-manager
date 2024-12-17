import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const NOTIFICATION_ADDED = "NOTIFICATION_ADDED";

let notifications: { id: string; message: string; createdAt: string }[] = [];

export const notificationResolvers = {
  Query: {
    notifications: () => notifications,
  },

  Mutation: {
    addNotification: (_: any, { message }: { message: string }) => {
      const newNotification = {
        id: String(notifications.length + 1),
        message,
        createdAt: new Date().toISOString(),
      };
      notifications.push(newNotification);

      pubsub.publish(NOTIFICATION_ADDED, { notificationAdded: newNotification });

      return newNotification;
    },
  },

  Subscription: {
    notificationAdded: {
      subscribe: () => pubsub.asyncIterableIterator(NOTIFICATION_ADDED),
    },
  },
};
