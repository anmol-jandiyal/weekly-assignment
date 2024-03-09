const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3001;
const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("public"));

server.listen(PORT, (err) => {
	if (err) {
		console.log("PROBLEM WHILE STARTING THE SERVER");
	} else {
		console.log("server started on port: " + PORT);
	}
});
