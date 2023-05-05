import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB connection successful`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
