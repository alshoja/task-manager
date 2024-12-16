import { gql } from 'apollo-server-express';

// Define the GraphQL schema
export const typeDefs = gql`
 type Query {
    hello: String
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!): User
  }

  type User {
    id: ID!
    name: String!
  }
`;
