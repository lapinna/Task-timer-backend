import userResolvers from "./user.js";
import taskResolvers from "./tasks.js";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...taskResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation,
  },
};

export default resolvers;