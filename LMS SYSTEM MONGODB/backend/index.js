const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRoute");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 3000;
const URL = "mongodb://localhost:27017/AVISOFT";

const server = express();
server.use(express.json());
server.use(cors());

server.use("/books", bookRouter);

mongoose
	.connect(URL)
	.then(() => {
		console.log("CONNECTION TO DATABASE ESTABLISHED");
		server.listen(PORT, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("SERVER STARTED");
			}
		});
	})
	.catch((err) => {
		console.log("PROBLEM WILL CONNECTING TO SERVER");
	});
