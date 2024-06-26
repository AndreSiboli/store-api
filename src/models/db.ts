import mongoose from "mongoose";

const connectingDB = mongoose.connect("mongodb://localhost:27017/token");

connectingDB
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database NOT conected!");
  });
