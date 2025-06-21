import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
let server: Server;
const port = 5000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://book:book@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to server successfully");
    server = app.listen(port, async () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
