const typeDefs = `#graphql

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
    token: String!
    tasks: [Task]
  }

  type Task {
    id: String!
    title: String!
    timeSpent: Int
  }

  type Query {
    getTasks: [Task]
    getTask(taskId: String!): Task
  }

  type Mutation {
    registerUser(username: String!,  email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    createTask(userId: String!, title: String!): Task!
    deleteTask(taskId: String!): String!
  }
`;

export default typeDefs;
