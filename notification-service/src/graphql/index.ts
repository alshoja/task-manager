import { makeExecutableSchema } from "@graphql-tools/schema";
import { notificationTypeDefs } from "./notification.schema";
import { notificationResolvers } from "./notification.resolver";

export const schema = makeExecutableSchema(
    {
        typeDefs: [
            notificationTypeDefs
        ],
        resolvers: [
            notificationResolvers
        ]
    }
);
