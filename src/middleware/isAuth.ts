import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const isAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.TOKEN_KEY) as JwtPayload;
        return user;
      } catch (error) {
        throw new GraphQLError("Invalid/Expired token");
      }
    } else {
      throw new GraphQLError("Authentication token must be  'Bearer [token] ");
    }
  } else {
    throw new GraphQLError("Authorization header must be provided");
  }
};
