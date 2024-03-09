// ===============================
//<----------------------DOM MANUPULATION---------------------->

//<-----SELECTING CONTAINER WHERE WE PLACE EVERY OUTPUT----->
const outputContainer = document.querySelector("main .right");

// <-----------------HTML FOR EACH PART RELATED TO ADD BOOK, DISPLAY LIST ETC------>
const sectionHtml = {
	table: `
<table class="book-list-table">
					<thead>
						<tr>
							<th class="sno">SNO</th>
							<th class="title-head">TITLE</th>
							<th class="author-head">AUTHOR</th>
							<th class="status-head">STATUS</th>
						</tr>
					</thead>
					<tbody> </tbody>
				</table>	
	`,
	addBookSection: `<section id="add-book-section" class="section">
					<h1>ADD BOOK SECTION</h1>
					<form action="">
						<div>
							<label for="book-title">BOOK TITLE:</label>
							<input type="text" name="book-title" id="book-title" required />
						</div>
						
						<div>
							<label for="book-author">BOOK AUTHOR:</label>
							<input type="text" name="book-author" id="book-author" required />
						</div>
						<div>
							<label for="book-description">BOOK Description: </label>
							<textarea name="book-description" id="book-description" cols="30" rows="10"></textarea>
						</div>

						<div><button class="btn" id="submit-btn">SUBMIT</button></div>
					</form>
				</section>
`,
	bookListSection: `<section class="section" id="book-list-section">
					<h1>LIST OF BOOKS</h1>
					<table class="book-list-table">
					<thead>
						<tr>
							<th class="sno">SNO</th>
							<th class="title-head">TITLE</th>
							<th class="author-head">AUTHOR</th>
							<th class="status-head">STATUS</th>
						</tr>
					</thead>
					<tbody> </tbody>
				</table>
				</section>`,

	serachSection: `<section id="search-section">
						<h1>SEARCH SECTION</h1>

					<form action="">
						<input type="text" placeholder="SEARCH BY TITLE" id="search-bar" />
						
					</form>
					<div class="search-output-container"> </div>
				</section>`,
};

// =======================
//<---------------SELECTING MAIN MENU BUTTONS------------>
const addBtnEle = document.querySelector(".add-btn");
const listBtnEle = document.querySelector(".list-btn");
const searchBtnEle = document.querySelector(".search-btn");

// FUNCTIONS RELATING TO BUTTON CLICK
function activeTabBtn(clickedBtn) {
	addBtnEle.classList.remove("active");
	searchBtnEle.classList.remove("active");
	listBtnEle.classList.remove("active");

	clickedBtn.classList.add("active");
}

// ===============================
// <----------------SECTIONS------------------------->

//<------------BOOK SECTION---------------->
function addBook(event) {
	event.preventDefault(); //to prevent refresh of page

	const descriptionEle = outputContainer.querySelector("#book-description");
	const authorEle = outputContainer.querySelector("#book-author");
	const titleEle = outputContainer.querySelector("#book-title");

	const description = descriptionEle.value.trim();
	const author = authorEle.value.trim();
	const title = titleEle.value.trim();

	// checking for invalid input

	if (author === "") {
		authorEle.style.border = "red 2px solid";
		return;
	} else {
		authorEle.style.border = "";
	}

	if (title === "") {
		titleEle.style.border = "red 2px solid";
		return;
	} else {
		titleEle.style.border = "";
	}
	if (description === "") {
		descriptionEle.style.border = "red 2px solid";

		return;
	} else {
		descriptionEle.style.border = "";
	}

	LMS.addBookToList(title, author, description);

	// resetting the input elements
	descriptionEle.value = "";
	authorEle.value = "";
	titleEle.value = "";
}

function showAddSection() {
	outputContainer.innerHTML = sectionHtml.addBookSection;

	activeTabBtn(addBtnEle);

	const addBookSection = outputContainer.querySelector("#add-book-section");
	const submitBtn = addBookSection.querySelector("#submit-btn");

	submitBtn.addEventListener("click", addBook);
}

addBtnEle.addEventListener("click", showAddSection);

//////////////////////////////////////////////////////
//<-----------------BOOK DISPLAY------------------->

function createEntry(sno, { title, author, isBorrowed: borrowed, _id }) {
	const tableRow = document.createElement("tr");

	const status = borrowed ? "Return" : "Borrow";

	tableRow.innerHTML = `<tr>
							<td class="sno">${sno}</td>
							<td class="title-val">${title}</td>
							<td class="author-val">${author}</td>
							<td class="status-val"> <button class="status-btn ${status}-btn" data-id="${_id}"  >${status}</button></td>
						</tr>`;

	return tableRow;
}

//<-----return and borrow button functions-------------->
async function returnBookBtnFn(target) {
	const message = await LMS.returnBook(target.dataset.id);
	if (message) {
		alert(message);
		target.classList.add("Borrow-btn");
		target.classList.remove("Return-btn");
		target.textContent = "Borrow";
	}
}

async function borrowBookBtnFn(target) {
	const message = await LMS.borrowBook(target.dataset.id);
	if (message) {
		alert(message);

		target.classList.remove("Borrow-btn");
		target.classList.add("Return-btn");
		target.textContent = "Return";
	}
}

function returnBorrow(data) {
	if (data.target.classList.contains("Borrow-btn")) borrowBookBtnFn(data.target);
	else if (data.target.classList.contains("Return-btn")) returnBookBtnFn(data.target);
}

async function showBookList() {
	outputContainer.innerHTML = sectionHtml.bookListSection;

	activeTabBtn(listBtnEle);

	const list = await LMS.bookList(1, 10);

	const tbody = document.querySelector("#book-list-section tbody");

	tbody.addEventListener("click", returnBorrow);

	for (let i = 0; i < list.length; i++) {
		tbody.appendChild(createEntry(i + 1, list[i], list._id));
	}
}
listBtnEle.addEventListener("click", showBookList);

//<---------SEARCH SECTION -------------------->
async function searchResults(e) {
	const prefix = e.target.value.toLowerCase().trim();

	if (!prefix) {
		//if prefix is empty the no need to print the list
		return;
	}

	const filteredBooks = await LMS.searchBook(prefix);

	const searchOutputContainer = outputContainer.querySelector("#search-section .search-output-container");
	const div = document.createElement("div");

	searchOutputContainer.innerHTML = "";
	div.innerHTML = sectionHtml.table;

	const tbody = div.querySelector("tbody");

	tbody.addEventListener("click", returnBorrow);

	if (filteredBooks)
		filteredBooks.forEach((book, index) => {
			tbody.appendChild(createEntry(index + 1, book));
			searchOutputContainer.appendChild(div);
		});
	else {
		console.log("ERROR ENCOUNTERED WHILE ACCESSING THE DATABASE");
	}
}

function showSearch() {
	outputContainer.innerHTML = sectionHtml.serachSection;

	activeTabBtn(searchBtnEle);

	outputContainer.querySelector("#search-bar").addEventListener("input", searchResults);
}

searchBtnEle.addEventListener("click", showSearch);
