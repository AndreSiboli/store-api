import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favoriteObj = {
  _id: {
    type: Number,
    required: true,
  },
};

const cartObj = {
  _id: {
    type: Number,
    required: true,
  },
  how_many: {
    type: Number,
    default: 1,
  },
};

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

  favorites: {
    type: [favoriteObj],
  },

  cart: {
    type: [cartObj],
  },

  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("users", users);
