import { gql } from "graphql-tag";

export const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    message: String!
    createdAt: String!
  }

  type Query {
    notifications: [Notification!]!
  }

  type Mutation {
    addNotification(message: String!): Notification!
  }

  type Subscription {
    notificationAdded: Notification!
  }
`;
