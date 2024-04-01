import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routers from "./routers/index.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({ credentials: true, origin: true }));
server.use("/products", routers.productRoute);
server.use("/users", routers.signLogRoute);
server.use("/seller", routers.sellerRoute);
server.use("/user", routers.userRoute);
server.use("/cart", routers.cartRoute);

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("CONNECTION WITH DB ESTABLISHED");
		server.listen(PORT, (err) => {});
		console.log("SERVER STARTED");
	})
	.catch((err) => {
		console.log(err);
	});
