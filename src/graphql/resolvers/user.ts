import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import { isAuth } from "../../middleware/isAuth.js";

const resolvers = {
  Query: {
    async currentUser(_, { user }) {
      if (!isAuth) {
        throw new GraphQLError("Not authenticated!");
      }
      return user;
    },
  },

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

      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );

      newUser.token = token;

      const res = await newUser.save();

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

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      return { user: user, token: token };
    },
  },
};

export default resolvers;
