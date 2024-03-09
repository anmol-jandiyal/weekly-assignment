const express = require("express");

const bookCrud = require("../controllers/bookDBManipulation");
const borrowUnborrow = require("../controllers/bookBorrowUnborrow");

const bookRoute = express.Router();

//<--------borrowing and return book route----------->
bookRoute.get("/borrow/:id", borrowUnborrow.borrowBook);
bookRoute.patch("/return/:id", borrowUnborrow.returnBook);

//<-------------TO GET LIST TO BORROWED BOOKS----------->
bookRoute.get("/borrowed/", borrowUnborrow.borrowedList);

// <-------list of books avaliable in the database------------------------>
bookRoute.get("/:title", bookCrud.getBook);
bookRoute.get("/:pno/:lim", bookCrud.getBookList);

bookRoute.post("/", bookCrud.addBook);

module.exports = bookRoute;
