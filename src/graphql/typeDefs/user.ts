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
    id: String
    title: String
    author: String
    timeSpent: Int
    createdAt: String
  }

  type Query {
    getTasks(userId: String!): [Task]
    getTask(userId: String!, taskId: String!): Task
  }

  type Mutation {
    registerUser(username: String!,  email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    createTask(userId: String!, title: String!): User!
    deleteTask(userId: String!, taskId: String!): String!
  }
`;

export default typeDefs;
