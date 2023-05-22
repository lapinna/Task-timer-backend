import { GraphQLError } from "graphql";
import Task from "../../models/task.js";
import User from "../../models/user.js";
import { isAuth } from "../../middleware/isAuth.js";

const resolvers = {
  Query: {
    async getTasks(_, __, context) {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    async getTask(_, { taskId }) {
      try {
        const task = await Task.findById(taskId);
        if (task) {
          return task;
        } else {
          throw new GraphQLError("Task not found");
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },

  Mutation: {
    async createTask(_, { userId, title }, context) {
      const { username } = isAuth(context);
      if (title.trim() === "") {
        throw new GraphQLError("Empty task");
        // const newTask = new Task({
        //   title,
        // });
        // const task = newTask.save();
        // return task;
      }
      const user = await User.findById(userId);
      if (user) {
        const newTask = new Task({
            title,
            username,
          });
        const taskArray = user.tasks = [];
        taskArray.unshift(newTask);

        await user.save();
        return user;
      } 
    },

    async deleteTask(_, { taskId }, context) {
      const user = isAuth(context);
      try {
        if (user) {
          const task = await Task.findById(taskId);
          await task.deleteOne();
          return "Task deleted successfully!";
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default resolvers;
