const typeDefs = `#graphql

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
    tasks: [Task]
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Task {
    id: String!
    title: String!
    timeSpent: Int
  }

  type Query {
    users: [User!]
    user(_id: String!): User!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input: LoginInput!): User!
  }
`;

export default typeDefs;
