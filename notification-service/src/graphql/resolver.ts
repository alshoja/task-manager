interface User {
    id: string;
    name: string;
  }
  
  const users: User[] = [];
  
  export const resolvers = {
    Query: {
      hello: () => "Hello, GraphQL!",
      getUser: (_: any, { id }: { id: string }) => users.find(user => user.id === id),
    },
    Mutation: {
      createUser: (_: any, { name }: { name: string }) => {
        const user = { id: (users.length + 1).toString(), name };
        users.push(user);
        return user;
      },
    },
  };
  