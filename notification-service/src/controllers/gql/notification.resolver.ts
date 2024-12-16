import { IResolvers } from "@graphql-tools/utils";

// Mock data for notifications (you can replace this with real data from a database)
const notifications = [
  { id: "1", user_id: 1, title: "Title 1", message: "Message 1", created_at: "2024-12-16" },
  { id: "2", user_id: 2, title: "Title 2", message: "Message 2", created_at: "2024-12-16" },
];

// Define resolvers for Query, Mutation, and Subscription
export const notificationResolvers: IResolvers = {
  Query: {
    // Query to get all notifications
    notifications: () => notifications,

    // Query to get notifications by user ID
    getNotifications: (_: any, { user_id }: { user_id: number }) => {
      return notifications.filter((notification) => notification.user_id === user_id);
    },
  },

  Mutation: {
    // Mutation to create a new notification
    createNotification: (_: any, { user_id, title, message }: { user_id: number; title: string; message: string }) => {
      const newNotification = {
        id: `${notifications.length + 1}`, // Simulate creating a new ID
        user_id,
        title,
        message,
        created_at: new Date().toISOString(),
      };
      notifications.push(newNotification);
      return newNotification;
    },
  },

  Subscription: {
    // Subscription for notificationReceived
    notificationReceived: {
      subscribe: (_: any, { user_id }: { user_id: number }) => {
        // Here you would normally return a pubsub trigger (like via Redis or a real-time service)
        // For now, returning a mock notification.
        return notifications.filter((notification) => notification.user_id === user_id);
      },
    },
  },
};
