const typeDefs = `#graphql

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
    tasks: [Task]
  }

  type AuthData {
    user: User!
    token: String!
    tokenExpire: Int!
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
    login(input: LoginInput!): AuthData!
  }
`;

export default typeDefs;
