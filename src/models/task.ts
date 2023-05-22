import { Schema, model } from "mongoose";

interface ITask {
  id: String;
  title: String;
  timeSpent: Number;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  timeSpent: { type: Number },
});

const Task = model<ITask>("tasks", taskSchema);

export default Task;
