import { Schema, model, Types } from "mongoose";

interface IUser {
  id: String;
  username: String;
  email: String;
  password: String;
  token: String;
  tasks: Types.DocumentArray<ITask>;
}

interface ITask {
  id: Types.ObjectId;
  title: string;
  author: string;
  timeSpent: number;
  createdAt: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  tasks: [{
      title: { type: String },
      author: { type: String },
      timeSpent: { type: Number },
      createdAt: { type: String },
    }],
});

const User = model<IUser>("users", userSchema);

export default User;
