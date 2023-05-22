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
    currentUser: User!
  }

  type Mutation {
    registerUser(username: String!,  email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
  }
`;

export default typeDefs;
