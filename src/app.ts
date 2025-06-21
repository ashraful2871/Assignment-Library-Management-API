import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { booksRouts } from "./app/controller/book.controller";

const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRouts);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome Library Management API");
});
export default app;
