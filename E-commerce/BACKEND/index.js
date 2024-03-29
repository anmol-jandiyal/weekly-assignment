import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import productRoute from "./routers/productRoute.js";
import signLogRoute from "./routers/signupLoginRoute.js";
import cartRoute from "./routers/cartRoutes.js";
import userRoute from "./routers/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({ credentials: true, origin: true }));
server.use("/products", productRoute);
server.use("/users", signLogRoute);
server.use("/user", userRoute);
server.use("/cart", cartRoute);

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
