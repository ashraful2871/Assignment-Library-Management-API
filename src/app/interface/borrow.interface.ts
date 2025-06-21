import { Document, Model, Types } from "mongoose";
import { IBook } from "./book.interface";

export interface IBorrow extends Document {
  book: Types.ObjectId;
  user: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
