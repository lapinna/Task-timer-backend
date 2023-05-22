import { Schema, model } from "mongoose";

interface IUser {
  id?: String;
  username: String;
  email: String;
  password: String;
  token: String;
  tasks: String[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  tasks: {},
});

const User = model<IUser>("users", userSchema);

export default User;
