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
borrowRouts.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: "$totalQuantity",
        },
      },
    ]);
    res.status(201).json({
      Success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      Success: false,
      message: error.message || "Internal Server Error",
      error: error.errors || error.message,
    });
  }
});
