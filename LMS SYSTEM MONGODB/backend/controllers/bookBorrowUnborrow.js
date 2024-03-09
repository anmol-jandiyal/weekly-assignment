//check in the cookies or local storage who is currently logged in and then perform manupulation no the books
const Book = require("../models/bookModel");

async function borrowBook(req, res) {
	const id = req.params.id;

	try {
		const bookInfo = await Book.findOne({ _id: id });

		//check if book exist or not and if exist then is available or not
		if (bookInfo && bookInfo.isBorrowed === false) {
			//if book borrowed successfully then update the book collection
			await Book.updateOne({ _id: bookInfo._id }, { isBorrowed: true });

			return res.status(200).json({
				MESSAGE: "Successfully borrowed ",
				book: {
					title: bookInfo.title,
					author: bookInfo.author,
					description: bookInfo.description,
				},
			});
		}
		return res.status(404).json({ error: "book not found or currently unavailable" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
}

async function returnBook(req, res) {
	const id = req.params.id;

	try {
		const bookInfo = await Book.findOne({ _id: id });

		if (bookInfo) {
			await Book.updateOne({ _id: id }, { isBorrowed: false });

			return res.status(200).json({
				MESSAGE: "Successfully returned",
				book: {
					title: bookInfo.title,
					author: bookInfo.author,
					description: bookInfo.description,
				},
			});
		}
		return res.status(403).json({ error: `Cannot find any book with title '${title}' in the database` });
	} catch (err) {
		return res.status(500).json({ error: err });
	}
}

async function borrowedList(req, res) {
	try {
		const borrowedBook = await Book.find({ isBorrowed: true });

		if (borrowedBook.length === 0) return res.status(404).json({ Message: "No book has been borrowed" });

		return res.status(200).json(borrowedBook);
	} catch (err) {
		return res.status(500).json({ error: err });
	}
}

module.exports = { borrowBook, returnBook, borrowedList };
