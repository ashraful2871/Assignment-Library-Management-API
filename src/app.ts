import express, { Application, Request, Response } from "express";
import { booksRouts } from "./app/controller/book.controller";
import { borrowRouts } from "./app/controller/borrow.controller";
import cors from "cors";
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-library-1ead2.web.app",
      "https://my-library-1ead2.firebaseapp.com",
    ],
  })
);
app.use("/api/books", booksRouts);
app.use("/api/borrow", borrowRouts);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome Library Management API");
});
export default app;
