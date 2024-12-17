import { PubSub } from 'graphql-subscriptions';

const NOTIFICATION_ADDED = "NOTIFICATION_ADDED";

let notifications: { id: string; message: string; createdAt: string }[] = [];

const pubsub = new PubSub();

let currentNumber = 0;
function incrementNumber() {
  currentNumber++;
  pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

incrementNumber();
export const notificationResolvers = {
  Query: {
    currentNumber() {
      return currentNumber;
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
    },
  },
};
