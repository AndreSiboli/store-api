import mongoose from "mongoose";
import "dotenv/config";

const connectingDB = mongoose.connect(process.env.API_DB_URL);

connectingDB
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database NOT conected!");
  });
