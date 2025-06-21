import { Server } from "http";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
let server: Server;
const port = 5000;
async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("connected to server successfully");
    server = app.listen(port, async () => {
      console.log(`Library Management listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
