import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRouts = express.Router();

borrowRouts.post("/", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({
      Success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      Success: false,
      message: error.message || "Internal Server Error",
      error: error.errors || error.message,
    });
  }
});
