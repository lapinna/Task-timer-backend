import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
}

const resolvers = {
  Query: {},

  Mutation: {
    async registerUser(_, { username, email, password }) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new GraphQLError(
          "A user is already registered with the email" + email
        );
      }

      let encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const res = await newUser.save();

      const token = generateToken(res);
      newUser.token = token;

      return res;
    },

    async loginUser(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User does not exist");
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        user.password as string
      );
      if (!isPasswordEqual) {
        throw new GraphQLError("Incorrect password");
      }

      const token = generateToken(user);
      user.token = token;

      return user;
    },
  },
};

export default resolvers;
