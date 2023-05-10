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
  }

  type Task {
    id: String!
    title: String!
    timeSpent: Int
  }

  type Query {
    currentUser: User!
  }

  type Mutation {
    registerUser(username: String!,  email: String!, password: String!): User!
    loginUser(email: String!, password: String!): AuthData!
  }
`;

export default typeDefs;
