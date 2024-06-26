import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("users", users);
