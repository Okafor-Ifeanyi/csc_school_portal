import mongoose from "mongoose";
import {} from "dotenv/config";
import { MESSAGES } from "./constants.config";

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

// const { MongoClient } = require("mongodb");
// // import { MongoClient }  from "mongodb"

// export async function getMongoDBVersion() {
//   const uri = DATABASE_URI; // Change this URI to match your MongoDB connection string
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const db = client.db();

//     // Get server version from client
//     const serverInfo = await client.db("admin").command({ buildInfo: 1 });
//     console.log("MongoDB Version:", serverInfo.version);
//   } finally {
//     await client.close();
//   }
// }
// getMongoDBVersion();
