import mongoose, { Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "author name is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required"],
    },
    description: {
      type: String,
      required: [true, "Book description is required"],
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Book copies number is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: true }
);
BookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  this.updatedAt = new Date();
  next();
});

BookSchema.statics.availabilityUpdate = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");
  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
};
export const Book = mongoose.model<IBook>("Book", BookSchema);
