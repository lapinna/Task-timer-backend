const typeDefs = `#graphql

  type User {
    _id: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String
    tasks: [Task]
  }

  type AuthData {
    user: User!
    token: String!
    tokenExpire: Int!
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
    registerUser(username: String!,  email: String!, password: String!): User!
    loginUser(email: String!, password: String!): AuthData!
  }
`;

export default typeDefs;
