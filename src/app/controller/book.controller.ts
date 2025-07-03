import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRouts = express.Router();

//create books
booksRouts.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "internal server error",
      error: error.errors || error.message,
    });
  }
});

// get all books
booksRouts.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = 10,
    } = req.query;
    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({
        [sortBy as string]: sort === "asc" ? 1 : -1,
      })
      .limit(Number(limit));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "internal server error",
      error: error.errors || error.message,
    });
  }
});

//Get Book by ID
booksRouts.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      const error: any = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "internal server error",
      error: error.errors || error.message,
    });
  }
});

// update books
booksRouts.patch(
  "/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookId } = req.params;
      const updatedBody = req.body;
      const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
        new: true,
        runValidators: true,
      });

      if (!book) {
        const error: any = new Error("Book not found");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        success: true,
        message: "Books updated successfully",
        data: book,
      });
    } catch (error: any) {
      let status = error.status || 500;
      let errorName = error.name || "Error";
      let errorDetails = error.errors || { message: error.message };
      if (errorName !== "ValidationError") {
        errorDetails = { message: error.message };
      }

      res.status(status).json({
        message: error.message || "Internal server error",
        success: false,
        error: {
          name: errorName,
          errors: errorDetails,
        },
      });
    }
  }
);
// delete books
booksRouts.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      const error: any = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Books deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "internal server error",
      error: error.errors || error.message,
    });
  }
});
