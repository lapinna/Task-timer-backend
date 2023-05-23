import { GraphQLError } from "graphql";
import User from "../../models/user.js";
import { isAuth } from "../../middleware/isAuth.js";

const resolvers = {
  Query: {
    async getTasks(_, { userId }) {
      try {
        const userDb = await User.findById(userId);
        if (userDb) {
          const tasks = userDb.tasks;
          if (tasks === null) {
            throw new GraphQLError("Tasks does not exist");
          } else {
            return tasks;
          }
        } else {
          throw new GraphQLError("User not found");
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    async getTask(_, { userId, taskId }) {
      try {
        const userDb = await User.findById(userId);
        if (userDb) {
          const task = userDb.tasks.find((task) => task.id === taskId);
          if (task) {
            return task;
          } else {
            throw new GraphQLError("Task does not exist");
          }
        } else {
          throw new GraphQLError("User not found");
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },

  Mutation: {
    async createTask(_, { userId, title }, context) {
      const user = isAuth(context);
      if (title.trim() === "") {
        throw new GraphQLError("Empty task");
      }
      const userDb = await User.findById(userId);
      if (userDb) {
        const newTask = {
          title,
          author: user.username,
          createdAt: new Date().toISOString(),
        };
        userDb.tasks.unshift(newTask);
        await userDb.save();
        return userDb;
      } else {
        throw new GraphQLError("User not found");
      }
    },

    async deleteTask(_, { userId, taskId }, context) {
      const user = isAuth(context);
      if (user) {
        try {
          const userDb = await User.findById(userId);
          if (userDb) {
            const taskIndex = userDb.tasks.findIndex(
              (task) => task.id === taskId
            );
            userDb.tasks.splice(taskIndex, 1);
            await userDb.save();
            return "Task successfully deleted!";
          }
        } catch (error) {
          throw new GraphQLError(error);
        }
      }
    },
  },
};

export default resolvers;
