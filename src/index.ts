import { ApolloServer, gql } from "apollo-server";
import { config } from "dotenv";
import connectDB from "./db";
import UserModel from "./models/user";
config();

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): ID
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    users: async () => await UserModel.find(),
    user: async (_, { id }) => {
      const users = await UserModel.findById(id);

      return users;
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const newUser = { name, email };
      await UserModel.create(newUser);
      return newUser;
    },
    updateUser: async (_, { id, name, email }) => {
      const user = await UserModel.findById(id);

      if (!user) return null;
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await UserModel.findById(id);
      await user.deleteOne();
    },
  },
};
(async () => {
  await connectDB();
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
