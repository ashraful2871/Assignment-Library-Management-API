import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./book.model";
import { IBookModel } from "../interface/book.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "quantity must be a positive number"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error("Book not found");
  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }
  next();
});

borrowSchema.post("save", async function () {
  const BookModel = Book as unknown as IBookModel;
  await BookModel.availabilityUpdate(this.book.toString(), this.quantity);
});

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
