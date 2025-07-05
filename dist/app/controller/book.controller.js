"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouts = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRouts = express_1.default.Router();
//create books
exports.booksRouts.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "internal server error",
            error: error.errors || error.message,
        });
    }
}));
// get all books
exports.booksRouts.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc" } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query).sort({
            [sortBy]: sort === "asc" ? 1 : -1,
        });
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "internal server error",
            error: error.errors || error.message,
        });
    }
}));
//Get Book by ID
exports.booksRouts.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            const error = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "internal server error",
            error: error.errors || error.message,
        });
    }
}));
// update books
exports.booksRouts.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updatedBody = req.body;
        if (typeof updatedBody.copies === "number") {
            updatedBody.available = updatedBody.copies > 0;
        }
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            const error = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Books updated successfully",
            data: book,
        });
    }
    catch (error) {
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
}));
// delete books
exports.booksRouts.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            const error = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Books deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "internal server error",
            error: error.errors || error.message,
        });
    }
}));
