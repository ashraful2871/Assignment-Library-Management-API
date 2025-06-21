"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controller/book.controller");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_controller_1.booksRouts);
app.use("/api/borrow", borrow_controller_1.borrowRouts);
app.get("/", (req, res) => {
    res.send("welcome Library Management API");
});
exports.default = app;
