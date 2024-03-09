const bookModel = require("../models/bookModel");

// <-------------------------create----------------------->
function addBook(req, res) {
	const bookData = req.body;

	const bookEntry = new bookModel(bookData);

	bookEntry
		.save()
		.then((entry) => res.status(201).json({ message: "Successful addition of new book", entry: entry }))
		.catch((error) => {
			if (error.code === 11000) {
				return res.status(400).json({ message: "book with same title already present" });
			}

			return res.status(500).json({ Error: "PROBLEM ENCUONTERED WHILE ADDING BOOK IN THE DATABASE" });
		});
}

// <-------------------------read----------------------->
function getBook(req, res) {
	const title = req.params.title;

	bookModel
		.find({ title: new RegExp(`^${title}`, "i") })
		.then((doc) => {
			if (doc) {
				return res.status(200).json(doc);
			}
			return res.status(404).json({ error: "Book NOT FOUND" });
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

function getBookList(req, res) {
	bookModel
		.find()
		.skip((req.params.pno - 1) * req.params.lim)
		.limit(req.params.lim)
		.then((doc) => {
			if (doc.length > 0) {
				return res.status(200).json(doc);
			}
			return res.status(404).json({ error: "No Book Available" });
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

module.exports = {
	addBook,
	getBook,
	getBookList,
};
