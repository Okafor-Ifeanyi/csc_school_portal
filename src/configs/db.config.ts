import mongoose from "mongoose";
import {} from "dotenv/config";
import { MESSAGES } from "./constants.config.js";

interface MyConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  family: number;
}

const connectOptions: MyConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
};

export async function connect(db: string) {
  // Database Connection
  await mongoose
    .connect(db, connectOptions)
    .then(() => {
      console.log(MESSAGES.DATABASE.CONNECTED);
    })
    .catch(() => {
      console.log(MESSAGES.DATABASE.ERROR);
    });
}
