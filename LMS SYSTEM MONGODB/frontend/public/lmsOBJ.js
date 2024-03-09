const ROOT = "http://127.0.0.1:8080/";

const LMS = {
	// adding book to the library
	addBookToList(title, author, description) {
		axios
			.post(`${ROOT}books`, { title: title, author: author, description, description })
			.then((res) => {
				message = res.data.message;
				alert(message);
			})
			.catch((err) => {
				const message = err.response?.data?.message ?? "ERROR ENCOUNTERED WHILE ACCESSING THE DATABASE";
				alert(message);
			});
	},

	// borrowing book

	borrowBook: async function (id) {
		try {
			const res = await axios.get(`${ROOT}books/borrow/${id}`);
			return res.data.MESSAGE;
		} catch (err) {
			console.log(err);
			return null;
		}
	},

	// retrun book
	returnBook: async function (id) {
		try {
			const res = await axios.patch(`${ROOT}books/return/${id}`);
			return res.data.MESSAGE;
		} catch (err) {
			console.log(err);
			return null;
		}
	},

	// available books
	bookList: async function (pno, lim) {
		try {
			console.log("book list lms");
			const res = await axios.get(`${ROOT}books/${pno}/${lim}`);
			return res.data;
		} catch (err) {
			console.log(err);
			console.log(err.response?.data?.error);
			return [];
		}
	},

	//searching for a book

	searchBook: async function (title) {
		try {
			const res = await axios.get(`${ROOT}books/${title}`);
			return res.data;
		} catch (err) {
			console.log(err);
			console.log(err.response?.data?.error);
			return null;
		}
	},
};
