import { Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
// // Interface for static methods on the Book model
// export interface IBookModel extends Model<IBook> {
//   availabilityUpdate(bookId: string, quantity: number): Promise<IBook>;
// }
