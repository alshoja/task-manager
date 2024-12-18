export const notificationTypeDefs = `#graphql
type Notification {
  user_id: Int!
  title: String!
  message: String!
  task_id: String!
}

type Query {
  getAllNotifications: [Notification]
  getNotificationById(id: Int!): Notification
}

type Subscription {
  notificationReceived: Notification
}
`;
