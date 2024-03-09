const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
	author: { type: String, required: true, trim: true, lowercase: true },
	description: { type: String },

	isBorrowed: { type: Boolean, default: false },
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
